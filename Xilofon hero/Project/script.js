const cançons = [
    {
        nom: "El gegant del pi",
        notes: ["mi", "fa", "sol", "mi", "do", "fa", "mi", "re", "re", "do", "re", "mi", "do", "mi", "fa", "sol", "mi", "do", "fa", "mi", "re", "do", "re", "mi", "do", "silenci"],
        ritme: [1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 4, 2],
        noteInterval: 700
    },
    {
        nom: "Ara ve nadal",
        notes: ["sol", "sol", "sol", "la", "sol", "silenci", "sol", "sol", "sol", "la", "sol", "silenci", "sol", "sol", "sol", "sol", "la", "la", "fa", "fa", "fa", "la", "sol", "silenci"],
        ritme: [1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2],
        noteInterval: 700
    },
    {
        nom: "Plou i fa sol",
        notes: ["sol", "mi", "fa", "sol", "la", "fa", "fa", "fa", "la", "sol", "mi", "sol", "mi", "fa", "sol", "la", "fa", "fa", "fa", "sol", "mi", "silenci"],
        ritme: [2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 4, 2],
        noteInterval: 400
    }
]

const notes = [
    {
        nom: "do",
        color: "#9B0019",
        nom_mostrar: "Do"
    },
    {
        nom: "re",
        color: "#F58E18",
        nom_mostrar: "Re"
    },
    {
        nom: "mi",
        color: "#FFCF11",
        nom_mostrar: "Mi"
    },
    {
        nom: "fa",
        color: "#83E935",
        nom_mostrar: "Fa"
    },
    {
        nom: "sol",
        color: "#358FE9",
        nom_mostrar: "Sol"
    },
    {
        nom: "la",
        color: "#002CA3",
        nom_mostrar: "La"
    },
    {
        nom: "si",
        color: "#6631F9",
        nom_mostrar: "Si"
    },
    {
        nom: "do_agut",
        color: "#CA67FD",
        nom_mostrar: "Do agut"
    },
    {
        nom: "silenci",
        color: "#000000",
        nom_mostrar: "∅"
    }
]

function clicarNota(nota) {
    let nota_actual = document.getElementById("nota_actual").innerHTML;
    if (nota == nota_actual.toLowerCase()) {
        setInnerHTML("punts_puntuacio", parseInt(document.getElementById("punts_puntuacio").innerHTML) + 1);
    }
    sonarNota(nota);
}

function sonarNota(nota) {
    var so = new Audio("so/" + nota + ".wav");
    so.play();
}

function play(song) {
    let color = true;
    setInnerHTML("canço_actual", song.toUpperCase());
    var cançó = cançons.find(function (cançó) {
        return cançó.nom === song;
    });
    var currentNoteIndex = 0;
    var intervalId = setInterval(() => {
        let nota_següent = notes.find(function (nota) {
            return nota.nom === cançó.notes[currentNoteIndex + 1];
        });
        let nota_actual = notes.find(function (nota) {
            return nota.nom === cançó.notes[currentNoteIndex];
        });
        let nota_anterior = notes.find(function (nota) {
            return nota.nom === cançó.notes[currentNoteIndex - 1];
        });
        canviarNota(nota_actual, "nota_actual");
        if (color == true) setBorder("nota_actual", "2px solid #000000");
        else setBorder("nota_actual", "2px solid #FFFFFF");
        color = !color;
        if (nota_anterior != null) {
            canviarNota(nota_anterior, "nota_anterior");
        }
        if (nota_següent != null) {
            canviarNota(nota_següent, "nota_següent");
        }
        // sonarNota(cançó.notes[currentNoteIndex]);

        currentNoteIndex++;
        if (currentNoteIndex >= cançó.notes.length) {
            let record = parseInt(document.getElementById("punts_puntuacio_maxima").innerHTML.split(" ")[0]);
            let punts = parseInt(document.getElementById("punts_puntuacio").innerHTML);
            if (punts > record) {
                setInnerHTML("punts_puntuacio_maxima", punts + " PUNTS");
            }
            reset();
            clearInterval(intervalId);
        }

    }, cançó.ritme[currentNoteIndex] * cançó.noteInterval);
}

function canviarNota(nota, id) {
    if (id == "nota_actual") setBackgroundColor(id, nota.color);
    else setTextColor(id, nota.color);
    setBorder(id, "1px solid " + nota.color);
    setInnerHTML(id, nota.nom_mostrar);
}

function reset() {
    setInnerHTML("nota_actual", "");
    setBackgroundColor("nota_actual", "");
    setBorder("nota_actual", "");
    setInnerHTML("nota_anterior", "");
    setBorder("nota_anterior", "");
    setInnerHTML("nota_següent", "");
    setBorder("nota_següent", "");
    setInnerHTML("punts_puntuacio", 0);
}

function setInnerHTML(id, value) {
    document.getElementById(id).innerHTML = value;
}

function setBorder(id, value) {
    document.getElementById(id).style.border = value;
}

function setBackgroundColor(id, value) {
    document.getElementById(id).style.backgroundColor = value;
}

function setTextColor(id, value) {
    document.getElementById(id).style.color = value;
}

function setBorder(id, value) {
    document.getElementById(id).style.border = value;
}

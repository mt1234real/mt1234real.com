const atkBtn = document.querySelector("button");
const tskInp = document.querySelector("input");
const qstLst = document.querySelector(".quest-list");

// Đọc nhiệm vụ đã được lưu
let savedTsk = JSON.parse(localStorage.getItem("myQst")) || [];

// Đọc kho lưu trữ Lvl, Exp
let curLvl = parseInt(localStorage.getItem("levelSaved")) || 1;
let curExp = parseInt(localStorage.getItem("expSaved")) || 0;

// Tạo số để tí lưu
const lvlTmp = document.getElementById("level");
const expTmp = document.getElementById("exp");

// Update điểm khi mới vào web
updateHub();

// Hàm thay đổi điểm trên màn hình
function updateHub() { 
    lvlTmp.innerText = JSON.stringify(curLvl);
    expTmp.innerText = JSON.stringify(curExp);
}

// Hàm tăng điểm
function gainExp() {
    curExp += 10;
    if (curExp === 100) {
        curExp = 0;
        curLvl += 1;
    }
    localStorage.setItem("levelSaved", JSON.stringify(curLvl));
    localStorage.setItem("expSaved", JSON.stringify(curExp));
    updateHub();
}

//Khởi tạo dayFree
dayFree();

// Hàm làm màu khi không có nhiệm vụ
function dayFree() {
    const extFreeMsg = document.querySelector(".freeMsg");
    if (savedTsk.length === 0) {
        if (!extFreeMsg) {
            const freeList = document.createElement("li");
            freeList.classList.add("freeMsg");

            const freeTxt = document.createElement("p");
            freeTxt.innerText = "✨ Today is Freeday! Enjoy! ✨";
            freeList.appendChild(freeTxt);
            qstLst.appendChild(freeList);
        }
    }
    else
        if (extFreeMsg) {
            extFreeMsg.remove();
        }
    return;
}

savedTsk.forEach(function (tskName) {
    showTheMonster(tskName);
});

// Hàm xoá phần tử khỏi mảng
function deleteTsk(tskNametmp) {
    // // Sử dụng hàm filter để lọc các phần tử (item(1) là rút gọn của (value, index, array))
    // savedTsk = savedTsk.filter(item => item !== tskNametmp);
    idxTmp = savedTsk.indexOf(tskNametmp);
    if (idxTmp !== -1) {
        savedTsk.splice(idxTmp, 1);
    }
    else return;
    // Biến savedTsk từ array thành string
    localStorage.setItem("myQst", JSON.stringify(savedTsk));
}

// Hàm in lên màn hình
function showTheMonster(tskName) {
    // Create thẻ
    const newTsk = document.createElement("li");
    const newTxt = document.createElement("p");

    // Tạo class cho newTxt để dễ kiểm soát
    newTxt.classList.add("monsterQst");

    // Thêm thẻ vào danh sách
    newTxt.innerText = tskName;
    newTsk.appendChild(newTxt);
    qstLst.appendChild(newTsk);


    // Animation when click button
    newTsk.addEventListener("click", function () {
        // Animation bla bla
        newTxt.style.textDecoration = "line-through";
        newTxt.style.color = "red";
        newTxt.style.transition = "opacity 0.5s ease";
        newTxt.style.opacity = "0.1";

        // Khi hoàn thành 1 nhiệm vụ thì mình sẽ gainExp
        gainExp();

        // Xoá khỏi mảng và màn hình
        deleteTsk(tskName);
        setTimeout(function () {
            newTsk.remove();
            dayFree();
        }, 1000);
    });
    dayFree();
}

// Hàm khi ấn vào nút ATTACK
atkBtn.addEventListener("click", function () {
    inpName = tskInp.value;
    if (inpName === "") {
        alert("Please type your monster name!!!");
        return;
    }

    // Ghi lên màn hình
    showTheMonster(inpName);

    // Ghi vào file
    savedTsk.push(inpName);
    localStorage.setItem("myQst", JSON.stringify(savedTsk));

    inpName = "";
    dayFree();
});


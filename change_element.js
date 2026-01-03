const element = {
    "H":"水素", "He":"ヘリウム", "Li":"リチウム", "Be":"ベリリウム", "B":"ホウ素", "C":"炭素", "N":"窒素", "O":"酸素", "F":"フッ素", "Ne":"ネオン",
    "Na":"ナトリウム", "Mg":"マグネシウム", "Al":"アルミニウム", "Si":"ケイ素", "P":"リン", "S":"硫黄", "Cl":"塩素", "Ar":"アルゴン", "K":"カリウム", 
    "Ca":"カルシウム", "Sc":"スカンジウム", "Ti":"チタン", "V":"バナジウム", "Cr":"クロム", "Mn":"マンガン", "Fe":"鉄", "Co":"コバルト", "Ni":"ニッケル",
    "Cu":"銅", "Zn":"亜鉛", "Ga":"ガリウム", "Ge":"ゲルマニウム", "As":"ヒ素", "Se":"セレン", "Br": "臭素","Kr":"クリプトン", "Rb":"ルビジウム", 
    "Sr":"ストロンチウム", "Y":"イットリウム", "Zr":"ジルコニウム", "Nb":"ニオブ", "Mo":"モリブデン", "Tc":"テクネチウム", "Ru":"ルテニウム", "Rh":"ロジウム", 
    "Pd":"パラジウム", "Ag":"銀", "Cd":"カドミウム", "In":"インジウム", "Sn":"スズ", "Sb":"アンチモン", "Te":"テルル", "I":"ヨウ素", "Xe":"キセノン", "Cs":"セシウム",
    "Ba":"バリウム", "La":"ランタン", "Ce":"セリウム", "Pr":"プラセオジム", "Nd":"ネオジム", "Pm":"プロメチウム", "Sm":"サマリウム", "Eu":"ユウロピウム", "Gd":"ガドリニウム",
    "Tb":"テルビウム", "Dy":"ジスプロシウム", "Ho":"ホルミウム", "Er":"エルビウム", "Tm":"ツリウム", "Yb":"イッテルビウム", "Lu":"ルテチウム", "Hf":"ハフニウム", "Ta":"タンタル",
    "W":"タングステン", "Re":"レニウム", "Os":"オスミウム", "Ir":"イリジウム", "Pt":"白金", "Au":"金", "Hg":"水銀", "Tl":"タリウム", "Pb":"鉛", "Bi":"ビスマス", "Po":"ポロニウム", 
    "At":"アスタチン", "Rn":"ラドン", "Fr":"フランシウム", "Ra":"ラジウム", "Ac":"アクチニウム", "Th":"トリウム", "Pa":"プロトアクチニウム", "U":"ウラン", "Np":"ネプツニウム", "Pu":"プルトニウム", 
    "Am":"アメリシウム", "Cm":"キュリウム", "Bk":"バークリウム", "Cf":"カリホルニウム", "Es":"アインスタイニウム", "Fm":"フェルミウム", "Md":"メンデレビウム", "No":"ノーベリウム", "Lr":"ローレンシウム", 
    "Rf":"ラザホージウム", "Db":"ドブニウム", "Sg":"シーボーギウム", "Bh":"ボーリウム", "Hs":"ハッシウム", "Mt":"マイトネリウム", "Ds":"ダームスタチウム", "Rg":"レントゲニウム", "Cn":"コペルニシウム", 
    "Nh":"ニホニウム", "Fl":"フレロビウム", "Mc":"モスコビウム", "Lv":"リバモリウム", "Ts":"テネシン", "Og":"オガネソン"
};

const one_element = Object.fromEntries(Object.entries(element).filter(([k,v]) => k.length == 1));
const two_element = Object.fromEntries(Object.entries(element).filter(([k,v]) => k.length == 2));
const fall_word = {
    "A": ["アルミニウム","銀","金"], "D": ["ジスプロシウム"], "E": ["エルビウム","ユーロピウム"],
    "L": ["リチウム","ランタン"], "M": ["マグネシウム","マンガン"], "R": ["ロジウム","レニウム","ラジウム"],
    "T": ["チタン","タンタル","テルル"], "X": ["キセノン"], "Z": ["亜鉛","ジルコニウム"],
    "J": ["亜鉛"], "Q": ["カリウム"], "G": ["ガリウム","ゲルマニウム"]
};

function serch_element(text){
    if (!text) return [];
    if (text.length >= 2){
        let target2 = text[0].toUpperCase() + text[1].toLowerCase();
        if (target2 in two_element){
            let res = serch_element(text.slice(2));
            if (res !== null) return [{name:two_element[target2], options:[two_element[target2]]}, ...res];
        }
    }
    let target1 = text[0].toUpperCase();
    if (target1 in one_element){
        let res = serch_element(text.slice(1));
        if(res !== null) return [{name:one_element[target1], options:[one_element[target1]]}, ...res];
    }
    if (target1 in fall_word){
        let res = serch_element(text.slice(1));
        if (res !== null) return [{name:fall_word[target1][0], options:fall_word[target1]}, ...res];
    }
    let res = serch_element(text.slice(1));
    if (res !== null) return [{name:text[0], options:[text[0]]}, ...res];
    return null;    
}

// 全ての処理を window.onload で囲むことで、HTMLが読み込まれた後に実行されるようにします
window.onload = function() {
    const inputField = document.getElementById("input_text");
    const button = document.getElementById("convert_button");
    const resultArea = document.getElementById("result_area");

    button.addEventListener("click", () => {
        const text = inputField.value;
        const convertresult = serch_element(text);
        resultArea.innerHTML = "変換結果: "; // リセット

        if (convertresult) {
            convertresult.forEach((item, index) => {
                if (item.options.length > 1) {
                    const container = document.createElement("div");
                    container.className = "element-container";
                    const currentDisplay = document.createElement("span");
                    currentDisplay.className = "current-name";
                    currentDisplay.innerText = item.name;
                    container.appendChild(currentDisplay);

                    const dropdownlist = document.createElement("div");
                    dropdownlist.className = "dropdown-list";
                    item.options.forEach(opt => {
                        const optItem = document.createElement("div");
                        optItem.className = "dropdown-item";
                        optItem.innerText = opt;
                        optItem.onclick = (e) => {
                            e.stopPropagation(); // 親要素へのイベント伝播を防ぐ
                            currentDisplay.innerText = opt;
                        };
                        dropdownlist.appendChild(optItem);
                    });
                    container.appendChild(dropdownlist);
                    resultArea.appendChild(container);
                } else {
                    const span = document.createElement("span");
                    span.className = "single-element";
                    span.innerText = item.name;
                    resultArea.appendChild(span);
                }
                if (index < convertresult.length - 1) {
                    const plus = document.createElement("span");
                    plus.innerText = " + ";
                    resultArea.appendChild(plus);
                }
            });
        } else {
            resultArea.innerText = "変換できませんでした。";
        }
    });
};
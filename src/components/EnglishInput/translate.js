export const translate= (c, e) => {
    
    if (e.keyCode !== 16 && e.keyCode !== 18 && !e.ctrlKey) {
        var letter = "";
        if (e.shiftKey) {
            let target= e.which;
            switch (true) {
                case target===49 : letter = "!"; break;
                case target===50 : letter = "@"; break;
                case target===51 : letter = "#"; break;
                case target===52 : letter = "$"; break;
                case target===53 : letter = "%"; break;
                case target===54 : letter = "^"; break;
                case target===55 : letter = "&"; break;
                case target===56 : letter = "*"; break;
                case target===57 : letter = "("; break;
                case target===48 : letter = ")"; break;
                case target===189 : letter = "_"; break;
                case target===187 : letter = "+"; break;
                case target===192 : letter = "~"; break;
                case target===219 : letter = "{"; break;
                case target===221 : letter = "}"; break;
                case target===186 : letter = ":"; break;
                case target===220 : letter = "|"; break;
                case target===188 : letter = "<"; break;
                case target===190 : letter = ">"; break;
                case target===191 : letter = "?"; break;
                case target===192 : letter = "~"; break;
                case target===110 : letter = "."; break;
                case target===222 : letter = "\""; break;
                case (target >=48 && target <=90):letter= String.fromCharCode(e.which);break;
            }
        }
        else {
            let target= e.which;
            switch (true) {
                case target===219 : letter = "["; break;
                case target===221 : letter = "]"; break;
                case target===186 : letter = ";"; break;
                case target===220 : letter = "\\"; break;
                case target===188 : letter = ","; break;
                case target===190 : letter = "."; break;
                case target===191 : letter = "/"; break;
                case target===192 : letter = "`"; break;
                case target===110 : letter = "."; break;
                case target===96 : letter = "0"; break;
                case target===97 : letter = "1"; break;
                case target===98 : letter = "2"; break;
                case target===99 : letter = "3"; break;
                case target===100 : letter = "4"; break;
                case target===101 : letter = "5"; break;
                case target===102 : letter = "6"; break;
                case target===103 : letter = "7"; break;
                case target===104 : letter = "8"; break;
                case target===105 : letter = "9"; break;
                case target===107 : letter = "+"; break;
                case target===106 : letter = "*"; break;
                case target===111 : letter = "/"; break;
                case target===109 : letter = "-"; break;
                case target===189 : letter = "-"; break;
                case target===187 : letter = "="; break;
                case target===222 : letter = "'"; break;
                case (target >=48 && target <=90):letter= String.fromCharCode(e.which);break;

            }
        }
        return letter;
    }


};
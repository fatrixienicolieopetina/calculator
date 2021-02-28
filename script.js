const Calculator = () => {
    let operator = '';
    let items = [];
    let shouldClearResultsContainer = false;

    function init() {
        let gridItems = document.getElementsByClassName("grid-item");

        for(let gridItem of gridItems) {
            gridItem.addEventListener("click", elementClick);
        }
    }

    function elementClick() {
        let resultsContainer = document.getElementById("results");
        let resultText = resultsContainer.textContent;
        let className = this.className;
        
        if(resultText == '0') {
            resultText = '';
        }

        if(className.includes("number")) {
            if(shouldClearResultsContainer) {
                resultText = '';
            }

            if(resultText.length < 24) {
                resultText = resultText.concat(this.textContent);
            }
            
            shouldClearResultsContainer = false;
        } else if(className.includes("operator") ) {
            if(operator != '=') {
                items.push(parseFloat(resultText));
            }
            
            if(items.length == 2) {
                resultText = evaluate();

                items = [];
                items.push(parseFloat(resultText));
            }

            
            operator = this.textContent;
                
            shouldClearResultsContainer = true;        
        } else if(className.includes("clear")) {
            resultText = '0';
            items = [];
        } else if(className.includes("delete")) {
            if(resultText.length > 1) {
                resultText = resultText.slice(0, length - 1);
            } else {
                resultText = '0';
            }

            items.pop();
            items.push(parseFloat(resultText));
        }

        updateResultsContainer(resultText);
    }

    function evaluate() {
        switch(operator) {
            case '+':
                return add(items[0], items[1]);
            case '-' :
                return items[0] - items[1];
            case '*' :
                return items[0] * items[1];
            case '/':
                if(items[1] == 0) {
                    return'luuuhh'
                } else {
                    return items[0] / items[1];
                }
        }    
    }
    function add(num1, num2) {
        return num1 + num2;
    }

    function updateResultsContainer(results) {
        let resultsContainer = document.getElementById("results");
        resultsContainer.textContent = results;
    }

    init();
}

Calculator();
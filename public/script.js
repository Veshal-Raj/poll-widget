const quesContainer = document.querySelector('.question-container');
const optDiv = document.querySelector('.option-div');
const resetBtn = document.querySelector('.reset-btn');
const submitBtn = document.querySelector('.submit-btn');

let selectedOption = null;

fetchPollData();

async function fetchPollData() {
    try {
        const response = await fetch('/get-poll-options');
        const responseData = await response.json();
        if (responseData?.ok) {
            const data = responseData?.data;

            const question = data[0]?.Question;
            const options = data[0]?.options;

            optDiv.innerHTML = ""
            quesContainer.innerHTML = ""

            let QuestionTag = document.createElement('p');
            QuestionTag.textContent = question;
            quesContainer.append(QuestionTag);

            let ulTag = document.createElement('ul');
            options.forEach((option) => {
                let liTag = document.createElement('li');
                liTag.textContent = option?.sport;
                liTag.value = option?.vote;
                liTag.id = option?.sport;
                liTag.classList.add('option')
                liTag.onclick = () => selectedData(option)
                ulTag?.append(liTag);
            })

            optDiv.append(ulTag);
        } else {
            alert(responseData?.msg)
            console.log(responseData)
        }

    } catch (error) {
        console.error('Error >> ', error);
        alert('Something went wrong');
    }
}

function selectedData(option) {
    selectedOption = option;
    console.log(option)
    let sport = option?.sport;
    document.querySelector(`#${sport}`).classList.add('active')
}

function resetSelectedOption () {
    selectedOption = null;
    submitBtn.disabled = false;
    fetchPollData();
    submitBtn.classList.remove('disabled')
}


async function updatePollData() {
    console.log('clicked')
    try {
        if (selectedOption) {
            const response = await fetch('/update-poll-option', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(selectedOption)
            });
            const responseData = await response.json();
            if (responseData?.ok) {
                
                const data = responseData?.data;
    
                const question = data[0]?.Question;
                const options = data[0]?.options;
                optDiv.innerHTML = ""
                quesContainer.innerHTML = ""
                
                let QuestionTag = document.createElement('p');
                QuestionTag.textContent = question;
                quesContainer.append(QuestionTag);
                let ulTag = document.createElement('ul');
                options.forEach((option) => {
                    let liTag = document.createElement('li');
                    let spanTag = document.createElement('span')
                    liTag.textContent = option?.sport;
                    liTag.value = option?.sport;
                    liTag.id = option?.sport;
                    liTag.classList.add('option')
                    spanTag.classList.add('vote')
                    spanTag.textContent = option?.vote;
                    liTag.appendChild(spanTag)
                    // liTag.onclick = () => selectedData(option)
                    ulTag?.append(liTag);
                })
    
                optDiv.append(ulTag);
                submitBtn.disabled = true;
                submitBtn.classList.add('disabled')
                let sport = selectedOption?.sport;
                document.querySelector(`#${sport}`).classList.add('active')
            } else {
                alert(responseData?.msg)
                console.log(responseData)
            }
        } else {
            console.log("selected option is null ::: selectedOption ", selectedOption);
            alert('Please select a option');
        }

    } catch (error) {
        console.error('Error >> ', error);
        alert('Something went wrong');
    }
}
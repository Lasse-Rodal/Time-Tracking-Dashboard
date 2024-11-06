let timeData;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        timeData = data;
        updateTimeCards('daily');
        setActiveButton('daily');
    })
    .catch(error => console.error('Error fetching data:', error));

function updateTimeCards(period) {
    const timecards = document.querySelectorAll('.cards-container');

    timecards.forEach(card => {
        const activityTitle = card.querySelector('h3').textContent;
        const activityData = timeData.find(item => item.title === activityTitle);

        if (activityData) {
            updateTimeCard(card, activityData, period);
        }
    });

    setActiveButton(period);
}

function updateTimeCard(card, activityData, period) {
    const currentData = activityData.timeframes[period];
    const currentElement = card.querySelector('.current');
    currentElement.textContent = `${currentData.current}${currentData.current === 1 ? 'hr' : 'hrs'}`;

    const previousElement = card.querySelector('.previous');
    previousElement.textContent = `Previous - ${currentData.previous}${currentData.previous === 1 ? 'hr' : 'hrs'}`;
}

function setActiveButton(activePeriod) {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        const buttonPeriod = button.textContent.toLowerCase();
        if (buttonPeriod === activePeriod) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

document.querySelector('.button:nth-of-type(1)').addEventListener('click', () => updateTimeCards('daily'));
document.querySelector('.button:nth-of-type(2)').addEventListener('click', () => updateTimeCards('weekly'));
document.querySelector('.button:nth-of-type(3)').addEventListener('click', () => updateTimeCards('monthly'));

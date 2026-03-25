const apiKey = 'c1OwJqn0agXInyh5MBH7atQZUflgdXlgMkJD9uA5';

document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('foodInput').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    document.getElementById('foodInput').onkeydown = (e) => {
        if (e.key === 'Enter') document.getElementById('searchBtn').click();
    };
    
    resultDiv.innerHTML = 'Загрузка...';
    errorDiv.innerHTML = '';

    fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey }
    })
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
            errorDiv.innerHTML = 'Ничего не найдено. Проверьте запрос.';
            resultDiv.innerHTML = '';
            return;
        }
        const f = data[0];
        const calories = typeof f.calories === 'number' ? f.calories : 'нет данных';
        const protein = typeof f.protein_g === 'number' ? f.protein_g : 'нет данных';
        
        resultDiv.innerHTML = `
            <div class="card">
                <h3>${f.name}</h3>
                <p>Калории: ${calories} ккал</p>
                <p>Белки: ${protein}г | Жиры: ${f.fat_total_g}г</p>
                <p style="font-size: 0.8rem; color: gray;">* Данные ограничены бесплатным тарифом API</p>
            </div>`;
    })
    .catch(() => errorDiv.innerHTML = 'Ошибка сети или ключа.');
});
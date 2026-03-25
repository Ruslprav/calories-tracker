const apiKey = 'c1OwJqn0agXInyh5MBH7atQZUflgdXlgMkJD9uA5';

document.getElementById('foodInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('foodInput').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');


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
            // Форматируем значения для красоты
            const calories = typeof f.calories === 'number' ? `${f.calories} ккал` : 'нет данных';
            const protein = typeof f.protein_g === 'number' ? `${f.protein_g} г` : 'нет данных';
            const fat = typeof f.fat_total_g === 'number' ? `${f.fat_total_g} г` : 'нет данных';

            resultDiv.innerHTML = `
            <div class="card">
                <h3>🥩 ${f.name.toUpperCase()}</h3>
                
                <div class="info-row">
                    <span class="label">🔥 Калории:</span>
                    <span class="value">${calories}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">🥚 Белки:</span>
                    <span class="value">${protein}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">🥑 Жиры:</span>
                    <span class="value">${fat}</span>
                </div>

                <div class="api-notice">
                    * Ограничение данных Free API
                </div>
            </div>`;
        })
        .catch(() => {
            errorDiv.innerHTML = 'Ошибка сети или ключа.';
            resultDiv.innerHTML = '';
        });
});
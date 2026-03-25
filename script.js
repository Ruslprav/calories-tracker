const apiKey = 'c1OwJqn0agXInyh5MBH7atQZUflgdXlgMkJD9uA5';

document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('foodInput').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    resultDiv.innerHTML = 'Загрузка...';
    errorDiv.innerHTML = '';

    fetch(`https://api.api-ninjas.com{query}`, {
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
        resultDiv.innerHTML = `
            <div class="card">
                <h3>${f.name}</h3>
                <p>Калории: ${f.calories} ккал</p>
                <p>Белки: ${f.protein_g}г | Жиры: ${f.fat_total_g}г</p>
            </div>`;
    })
    .catch(() => errorDiv.innerHTML = 'Ошибка сети или ключа.');
});
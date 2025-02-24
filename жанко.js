document.addEventListener("DOMContentLoaded", function() {
    let rating = 0;
    const stars = document.querySelectorAll('.star');
    const reviewForm = document.getElementById('reviewForm');
    const reviewText = document.getElementById('review');
    const userName = document.getElementById('name');
    const submittedReview = document.getElementById('submittedReview');
    const submittedText = document.getElementById('submittedText');
    const submittedRating = document.getElementById('submittedRating');
    const submittedName = document.getElementById('submittedName');
  
    // Функция для загрузки сохраненных отзывов
    function loadReviews() {
      const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
      if (savedReviews.length > 0) {
        const lastReview = savedReviews[savedReviews.length - 1];
        submittedText.textContent = lastReview.review;
        submittedRating.textContent = lastReview.rating;
        submittedName.textContent = lastReview.name;
        submittedReview.style.display = 'block';
      }
    }
  
    // Загружаем отзыв, если он был сохранён ранее
    loadReviews();
  
    // Добавляем обработчик событий для выбора звёзд
    stars.forEach(star => {
      star.addEventListener('click', function() {
        rating = parseInt(star.getAttribute('data-value'));
        stars.forEach(s => s.classList.remove('selected'));
        for (let i = 0; i < rating; i++) {
          stars[i].classList.add('selected');
        }
      });
    });
  
    // Обработчик отправки формы
    reviewForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      if (rating === 0) {
        alert('Пожалуйста, выберите оценку!');
        return;
      }
  
      if (userName.value.trim() === "") {
        alert('Пожалуйста, введите ваше имя!');
        return;
      }
  
      // Сохранение отзыва в localStorage
      const reviewData = {
        name: userName.value,
        review: reviewText.value,
        rating: rating
      };
  
      // Получаем все отзывы из localStorage и добавляем новый
      const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
      savedReviews.push(reviewData);
  
      // Сохраняем обновленный список отзывов в localStorage
      localStorage.setItem('reviews', JSON.stringify(savedReviews));
  
      // Отображаем отзыв на странице
      submittedText.textContent = reviewText.value;
      submittedRating.textContent = rating;
      submittedName.textContent = userName.value;
      reviewForm.reset();
      stars.forEach(star => star.classList.remove('selected'));
      rating = 0;
      
      submittedReview.style.display = 'block';
    });
  });
  
<script setup>
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">

      <div class="footer-top">

        <div class="footer-brand">
          <span class="footer-logo">ROYALE</span>
          <p class="footer-desc">
            Лицензированное онлайн-казино.<br>
            Играйте ответственно.
          </p>
          <div class="footer-badges">
            <span class="badge">18+</span>
            <span class="badge">MGA Licensed</span>
            <span class="badge">SSL Secured</span>
          </div>
        </div>

        <div class="footer-links">

          <div class="footer-col">
            <h3 class="footer-col-title">Игры</h3>
            <ul class="footer-col-list">
              <li><RouterLink to="/slots">Слоты</RouterLink></li>
              <li><RouterLink to="/blackjack">Блэкджек</RouterLink></li>
              <li><RouterLink to="/poker">Покер</RouterLink></li>
              <li><RouterLink to="/roulette">Рулетка</RouterLink></li>
            </ul>
          </div>

</div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">&copy; 2026 ROYALE Casino. Все права защищены.</p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--casino-bg-surface);
  border-top: 1px solid var(--border-card);
  color: var(--casino-text-primary);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
  padding: 48px 0 40px;
}

.footer-brand {
  flex: 0 0 auto;
  max-width: 280px;
}

.footer-logo {
  display: block;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--gold);
  margin-bottom: 12px;
}

.footer-desc {
  font-size: 0.8125rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 48px;
}

.footer-col-title {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 16px;
}

.footer-col-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col-list a {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--t-fast);
}

.footer-col-list a:hover {
  color: var(--gold);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 20px 0;
  border-top: 1px solid var(--border-card);
}

.footer-copy {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
}

.footer-badges {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.badge {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-sm);
  padding: 3px 9px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .footer-inner {
    padding: 0 20px;
  }

  .footer-top {
    flex-direction: column;
    gap: 32px;
    padding: 36px 0 28px;
  }

  .footer-brand {
    max-width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 0;
  }
}

@media (max-width: 480px) {
  .footer-links {
    gap: 32px;
  }
}
</style>

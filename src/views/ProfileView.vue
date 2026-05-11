<script setup>
import usePlayer from '../composables/usePlayer'

const { username, balance, gamesPlayed, totalWinnings, topUp } = usePlayer()
</script>

<template>
    <div class="profile-page">
        <h2>Профиль</h2>

        <div class="card">
            <div class="avatar">{{ username[0]?.toUpperCase() }}</div>
            <div class="user-name">{{ username }}</div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">{{ balance }} ₽</div>
                <div class="stat-label">Баланс</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{{ gamesPlayed }}</div>
                <div class="stat-label">Игр сыграно</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">{{ totalWinnings }} ₽</div>
                <div class="stat-label">Общий выигрыш</div>
            </div>
        </div>

        <div class="topup-section">
            <div class="topup-title">Пополнить баланс</div>
            <div class="topup-buttons">
                <button class="btn-topup" @click="topUp(1000)">+ 1 000 ₽</button>
                <button class="btn-topup" @click="topUp(5000)">+ 5 000 ₽</button>
                <button class="btn-topup" @click="topUp(10000)">+ 10 000 ₽</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 40px;
}

h2 {
    font-size: 32px;
    color: var(--gold);
    letter-spacing: 4px;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--gold);
    color: #000;
    font-size: 36px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-name {
    font-size: 22px;
    font-weight: 700;
    color: var(--casino-text-primary);
    letter-spacing: 2px;
}

.stats-grid {
    display: flex;
    gap: 16px;
}

.stat-card {
    background: var(--casino-bg-card);
    border: var(--border-card);
    border-radius: var(--radius-md);
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 160px;
}

.stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--gold);
}

.stat-label {
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: 1px;
}

.topup-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.topup-title {
    font-size: 16px;
    color: var(--text-secondary);
    letter-spacing: 1px;
    text-transform: uppercase;
}

.topup-buttons {
    display: flex;
    gap: 12px;
}

.btn-topup {
    background: transparent;
    color: var(--gold);
    border: 1px solid var(--gold);
    border-radius: var(--radius-sm);
    padding: 10px 24px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background var(--t-fast), color var(--t-fast);
}

.btn-topup:hover {
    background: var(--gold);
    color: #000;
}
</style>

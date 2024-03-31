<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Adjust height as needed */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #1a202c; /* Adjust spinner color */
  border-radius: 50%;
  width: 40px; /* Adjust width as needed */
  height: 40px; /* Adjust height as needed */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

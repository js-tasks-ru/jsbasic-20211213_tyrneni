let calculator = {
  // ваш код
  read(a, b) {
    this.a = a;
    this.b = b;
    /* this.a = +prompt("Значение a ", a);
    this.b = +prompt("Значение b ", b); */
  },
  
  sum() {
    return (this.a + this.b);
  },

  mul() {
    return (this.a * this.b);
  }

};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально

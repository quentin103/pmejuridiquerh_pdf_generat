import * as Handlebars from 'handlebars';

export class HandlebarsHelpers {
  static register() {
    // Helper pour formater les dates
    Handlebars.registerHelper('formatDate', (date: Date | string, format?: string) => {
      if (!date) return '';
      
      const d = new Date(date);
      if (isNaN(d.getTime())) return '';
      
      switch (format) {
        case 'short':
          return d.toLocaleDateString('fr-FR');
        case 'long':
          return d.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        case 'time':
          return d.toLocaleTimeString('fr-FR');
        default:
          return d.toLocaleDateString('fr-FR');
      }
    });

    // Helper pour formater les nombres
    Handlebars.registerHelper('formatNumber', (num: number, decimals?: number) => {
      if (typeof num !== 'number') return num;
      return num.toLocaleString('fr-FR', {
        minimumFractionDigits: decimals || 0,
        maximumFractionDigits: decimals || 2,
      });
    });

    // Helper pour formater les devises
    Handlebars.registerHelper('formatCurrency', (amount: number, currency = 'EUR') => {
      if (typeof amount !== 'number') return amount;
      return amount.toLocaleString('fr-FR', {
        style: 'currency',
        currency: currency,
      });
    });

    // Helpers conditionnels
    Handlebars.registerHelper('eq', (a: any, b: any) => a === b);
    Handlebars.registerHelper('ne', (a: any, b: any) => a !== b);
    Handlebars.registerHelper('gt', (a: any, b: any) => a > b);
    Handlebars.registerHelper('lt', (a: any, b: any) => a < b);
    Handlebars.registerHelper('gte', (a: any, b: any) => a >= b);
    Handlebars.registerHelper('lte', (a: any, b: any) => a <= b);

    // Helper pour les calculs
    Handlebars.registerHelper('add', (a: number, b: number) => a + b);
    Handlebars.registerHelper('subtract', (a: number, b: number) => a - b);
    Handlebars.registerHelper('multiply', (a: number, b: number) => a * b);
    Handlebars.registerHelper('divide', (a: number, b: number) => a / b);

    // Helper pour les boucles avec index
    Handlebars.registerHelper('times', function(n: number, block: any) {
      let result = '';
      for (let i = 0; i < n; i++) {
        result += block.fn({ index: i, number: i + 1 });
      }
      return result;
    });

    // Helper pour les tableaux
    Handlebars.registerHelper('length', (array: any[]) => {
      return Array.isArray(array) ? array.length : 0;
    });

    // Helper pour les objets
    Handlebars.registerHelper('keys', (obj: any) => {
      return Object.keys(obj || {});
    });

    // Helper pour capitaliser
    Handlebars.registerHelper('capitalize', (str: string) => {
      if (typeof str !== 'string') return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    // Helper pour les conditions multiples
    Handlebars.registerHelper('or', function(...args: any[]) {
      return args.slice(0, -1).some(Boolean);
    });

    Handlebars.registerHelper('and', function(...args: any[]) {
      return args.slice(0, -1).every(Boolean);
    });
  }
}
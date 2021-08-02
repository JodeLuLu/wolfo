const units = [
    { max: 59000, value: 1000, name: 'segundo', past: 'hace 1 segundo', future: 'en 1 segundo' },
    { max: 2760000, value: 60000, name: 'minuto', past: 'hace 1 minuto', future: 'en 1 minuto' }, 
    { max: 72000000, value: 3600000, name: 'hora', past: 'hace 1 hora', future: 'hace 1 hora' }, 
    { max: 518400000, value: 86400000, name: 'día', past: 'ayer', future: 'mañana' }, 
    { max: 2419200000, value: 604800000, name: 'semana', past: 'hace 1 semana', future: 'en 1 semana' }, 
    { max: 28512000000, value: 2592000000, name: 'mese', past: 'hace 1 mes', future: 'en 1 mes' } 
  ];

  const unitsO = [
    { max: 59000, value: 1000, name: 'segundo', past: '1', future: '1' },
    { max: 2760000, value: 60000, name: 'minuto', past: '1', future: '1' }, 
    { max: 72000000, value: 3600000, name: 'hora', past: '1', future: '1' }, 
    { max: 518400000, value: 86400000, name: 'día', past: '1', future: '1' }, 
    { max: 2419200000, value: 604800000, name: 'semana', past: '1', future: '1' }, 
    { max: 28512000000, value: 2592000000, name: 'mese', past: '1', future: '1' } 
  ];

export class TimeStamp {
    timestamp: number | string;
    constructor(timestamp: number | string) {
        this.timestamp = timestamp;
    }

     format(diff: number, divisor: number, unit: string, past: string, future: string, isInTheFuture: boolean) {
        var val = Math.round(Math.abs(diff) / divisor);
        if (isInTheFuture) return val <= 1 ? future : 'en ' + val + ' ' + unit + 's';
        return val <= 1 ? past : 'hace' + ' ' + val + ' ' + unit + 's';
      }

    ago(date: Date, max?: string): string {
        const diff = Date.now() - date.getTime();
      
        if (Math.abs(diff) < 1000) return 'justo ahora';
      
        for (var i = 0; i < units.length; i++) {
          if (Math.abs(diff) < units[i].max || (max && units[i].name === max)) {
            return this.format(diff, units[i].value, units[i].name, units[i].past, units[i].future, diff < 0);
          }
        }
    
        return this.format(diff, 31536000000, 'año', 'hace 1 año', 'en 1 año', diff < 0);
      
      };


      formatO(diff: number, divisor: number, unit: string, past: string, future: string, isInTheFuture: boolean) {
        var val = Math.round(Math.abs(diff) / divisor);
        if (isInTheFuture) return val <= 1 ? future : '' + val;
        return val <= 1 ? past : '' + val;
      }
      
     
      
    agoO(date: Date, max?: string): string {
        const diff = Date.now() - date.getTime();
      
        if (Math.abs(diff) < 1000) return '0';
      
        for (var i = 0; i < unitsO.length; i++) {
          if (Math.abs(diff) < unitsO[i].max || (max && unitsO[i].name === max)) {
            return this.formatO(diff, unitsO[i].value, unitsO[i].name, unitsO[i].past, unitsO[i].future, diff < 0);
          }
        }
    
        return this.formatO(diff, 31536000000, 'año', '1', '1', diff < 0);
      };


      relative(maxium?: "segundo" | "minuto" | "hora" | "día" | "semana" | "mese" | "año") {
        const a = this.ago(new Date(this.timestamp));

        if (!maxium) {
            const a = this.ago(new Date(this.timestamp), "segundo");
            const b = this.ago(new Date(this.timestamp), "minuto");
            const c = this.ago(new Date(this.timestamp), "hora");
            const d = this.ago(new Date(this.timestamp), "día");
            const e = this.ago(new Date(this.timestamp), "semana");
            const f = this.ago(new Date(this.timestamp), "mese");
            const g = this.ago(new Date(this.timestamp), "año");

            return [a, b, c, d, e, f, g];
        }

        return this.ago(new Date(this.timestamp), maxium);
    }

    relativeNum(maxium?: "segundo" | "minuto" | "hora" | "día" | "semana" | "mese" | "año") {
        if (!maxium) {
            const a = this.agoO(new Date(this.timestamp), "segundo");
            const b = this.agoO(new Date(this.timestamp), "minuto");
            const c = this.agoO(new Date(this.timestamp), "hora");
            const d = this.agoO(new Date(this.timestamp), "día");
            const e = this.agoO(new Date(this.timestamp), "semana");
            const f = this.agoO(new Date(this.timestamp), "mese");
            const g = this.agoO(new Date(this.timestamp), "año");

            return [a, b, c, d, e, f, g];
        }
        return this.agoO(new Date(this.timestamp), maxium);
    }

    invert(str: string) {
        var x = str.length;
        var invertida = "";
    
        while (x>=0) {
            invertida = invertida + str.charAt(x);
            x--;
        }
         return invertida;
    }
    
    // Language: typescript
    
    OutDecimals() {
        var si = this.invert(`${this.timestamp}`)
        var no = si.slice(3)
        var noo = this.invert(no);
    
        return noo;
    }


      


}
const fs = require('fs');
const path = require('path');

const dir = 'd:/transito seguro/DS';

function processFile(filename) {
    const filepath = path.join(dir, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    // Remove old SEMANA labels if any to avoid double counting
    content = content.replace(/### (?:📖 |🧠 |🗣️ |🔄 |📝 |📊 |🗺️ |📚 |👍 |🛠️ )?SEMANA \d+ \| /g, '### ');

    const bimesterRegex = /(# 🎒 BIMESTRE \d:[\s\S]*?)(?=# 🎒 BIMESTRE|\n---|\n## 📑 SUMÁRIO)/g;
    let bimesterMatches = [...content.matchAll(bimesterRegex)];

    if (bimesterMatches.length !== 4) {
        console.log(`Skipping ${filename} - found ${bimesterMatches.length} bimesters.`);
        return;
    }

    let globalWeek = 1;
    let newContent = content;

    for (let i = 0; i < 4; i++) {
        let bimesterBlock = bimesterMatches[i][0];
        const headerRegex = /### (.+)/g;
        let headers = [...bimesterBlock.matchAll(headerRegex)];

        let newBimesterBlock = bimesterBlock;

        // If it's Volume 7, 8, 9 (High school) which typically has 5 headers
        if (headers.length === 5) {
            newBimesterBlock = newBimesterBlock.replace(headers[0][0], `### SEMANA ${globalWeek} | ${headers[0][1]}\n\n### SEMANA ${globalWeek + 1} | DEBATE E APROFUNDAMENTO`);
            newBimesterBlock = newBimesterBlock.replace(headers[1][0], `### SEMANA ${globalWeek + 2} | ${headers[1][1]}`);
            newBimesterBlock = newBimesterBlock.replace(headers[2][0], `### SEMANA ${globalWeek + 3} | ${headers[2][1]}\n\n### SEMANA ${globalWeek + 4} | ANÁLISE PRÁTICA DO CASO`);
            newBimesterBlock = newBimesterBlock.replace(headers[3][0], `### SEMANA ${globalWeek + 5} | ${headers[3][1]}`);
            newBimesterBlock = newBimesterBlock.replace(headers[4][0], `### SEMANA ${globalWeek + 6} | ${headers[4][1]}\n\n### SEMANA ${globalWeek + 7} | INTEGRAÇÃO COM O APP E AUTOAVALIAÇÃO`);
            globalWeek += 8;
        } 
        else if (headers.length === 7) {
            newBimesterBlock = newBimesterBlock.replace(headers[0][0], `### SEMANA ${globalWeek} | ${headers[0][1]}`);
            newBimesterBlock = newBimesterBlock.replace(headers[1][0], `### SEMANA ${globalWeek + 1} | ${headers[1][1]}`);
            newBimesterBlock = newBimesterBlock.replace(headers[2][0], `### SEMANA ${globalWeek + 2} | ${headers[2][1]}`);
            newBimesterBlock = newBimesterBlock.replace(headers[3][0], `### SEMANA ${globalWeek + 3} | ${headers[3][1]}`);
            newBimesterBlock = newBimesterBlock.replace(headers[4][0], `### SEMANA ${globalWeek + 4} | ${headers[4][1]}`);
            newBimesterBlock = newBimesterBlock.replace(headers[5][0], `### SEMANA ${globalWeek + 5} | ${headers[5][1]}\n\n### SEMANA ${globalWeek + 6} | DEBATE DA PESQUISA DE CAMPO`);
            newBimesterBlock = newBimesterBlock.replace(headers[6][0], `### SEMANA ${globalWeek + 7} | ${headers[6][1]}`);
            globalWeek += 8;
        }
        else if (headers.length === 8) {
            for (let j = 0; j < 8; j++) {
                newBimesterBlock = newBimesterBlock.replace(headers[j][0], `### SEMANA ${globalWeek + j} | ${headers[j][1]}`);
            }
            globalWeek += 8;
        } else {
             // Generic fallback
             for (let j = 0; j < headers.length; j++) {
                newBimesterBlock = newBimesterBlock.replace(headers[j][0], `### SEMANA ${globalWeek + j} | ${headers[j][1]}`);
            }
            globalWeek += 8; // Force to skip to next bimester
        }
        
        newContent = newContent.replace(bimesterBlock, newBimesterBlock);
    }

    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log(`Processed ${filename}`);
}

const files = fs.readdirSync(dir).filter(f => f.startsWith('Volume') && f.endsWith('.md'));
files.forEach(processFile);

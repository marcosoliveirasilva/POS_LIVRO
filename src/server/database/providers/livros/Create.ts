import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ILivro } from '../../models';

export const create = async (livro: Omit<ILivro, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../00_livros.json');
      let livros: ILivro[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          livros = JSON.parse(fileData);
        }
      }

      const novoId = livros.length > 0
        ? Math.max(...livros.map((f) => Number(f.id) || 0)) + 1
        : 1;


      const dataAtual = new Date();
      const novoRegistro: ILivro = {
        ...livro,
        id: novoId,
        created_at: dataAtual,
        updated_at: dataAtual,
      } as ILivro;

      livros.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(livros, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};

import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ILivro } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../00_livros.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let livros: ILivro[] = [];

    if (fileData.trim() !== '') {
      livros = JSON.parse(fileData);
    }

    const index = livros.findIndex((livro: ILivro) => Number(livro.id) === Number(id));

    if (index !== -1) {
      livros.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(livros, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};

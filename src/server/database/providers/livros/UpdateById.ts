import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ILivro } from '../../models';

export const updateById = async (id: number, favorito: Omit<ILivro, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../00_livros.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let livros: ILivro[] = [];

    if (fileData.trim() !== '') {
      livros = JSON.parse(fileData);
    }

    const index = livros.findIndex((item: ILivro) => Number(item.id) === Number(id));

    if (index !== -1) {
      livros[index] = {
        ...livros[index],
        ...favorito,
        updated_at: new Date()
      };

      writeFileSync(filePath, JSON.stringify(livros, null, 2), 'utf-8');

      return;
    }

      return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};

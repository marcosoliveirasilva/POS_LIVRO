import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ILivro } from '../../models';

export const getById = async (id: number): Promise<ILivro | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../00_livros.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let livros: ILivro[] = [];

    if (fileData.trim() !== '') {
      livros = JSON.parse(fileData);
    }

    const result = livros.find((livro: ILivro) => Number(livro.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      } as ILivro;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};

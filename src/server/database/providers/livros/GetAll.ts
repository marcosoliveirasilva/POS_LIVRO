import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ILivro } from '../../models';

export const getAll = async (page: number, limit: number, titulo: string, id = 0): Promise<ILivro[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../00_livros.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let livros: ILivro[] = [];

    if (fileData.trim() !== '') {
      livros = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = livros.filter((item: ILivro) => {
      const matchId = Number(item.id) === searchId;
      const matchTitulo = item.titulo.toLowerCase().includes(titulo.toLowerCase());

      return matchId || matchTitulo;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: ILivro) => Number(item.id) !== searchId)) {
      const resultById = livros.find((item: ILivro) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: ILivro) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    })) as ILivro[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};

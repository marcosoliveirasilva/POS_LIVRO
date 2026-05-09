import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IFavorito } from '../../models';

export const getAll = async (page: number, limit: number, titulo: string, id = 0): Promise<IFavorito[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_favoritos.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let favoritos: IFavorito[] = [];

    if (fileData.trim() !== '') {
      favoritos = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = favoritos.filter((item: IFavorito) => {
      const matchId = Number(item.id) === searchId;
      const matchTitulo = item.titulo.toLowerCase().includes(titulo.toLowerCase());

      return matchId || matchTitulo;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IFavorito) => Number(item.id) !== searchId)) {
      const resultById = favoritos.find((item: IFavorito) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: IFavorito) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    })) as IFavorito[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};

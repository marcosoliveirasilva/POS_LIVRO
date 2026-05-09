import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IFavorito } from '../../models';

export const getById = async (id: number): Promise<IFavorito | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_favoritos.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let favoritos: IFavorito[] = [];

    if (fileData.trim() !== '') {
      favoritos = JSON.parse(fileData);
    }

    const result = favoritos.find((favorito: IFavorito) => Number(favorito.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      } as IFavorito;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};

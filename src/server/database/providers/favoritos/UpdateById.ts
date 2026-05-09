import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFavorito } from '../../models';

export const updateById = async (id: number, favorito: Omit<IFavorito, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_favoritos.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let favoritos: IFavorito[] = [];

    if (fileData.trim() !== '') {
      favoritos = JSON.parse(fileData);
    }

    const index = favoritos.findIndex((item: IFavorito) => Number(item.id) === Number(id));

    if (index !== -1) {
      favoritos[index] = {
        ...favoritos[index],
        ...favorito,
        updated_at: new Date()
      };

      writeFileSync(filePath, JSON.stringify(favoritos, null, 2), 'utf-8');

      return;
    }

      return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};

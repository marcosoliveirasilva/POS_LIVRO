import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFavorito } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_favoritos.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let favoritos: IFavorito[] = [];

    if (fileData.trim() !== '') {
      favoritos = JSON.parse(fileData);
    }

    const index = favoritos.findIndex((favorito: IFavorito) => Number(favorito.id) === Number(id));

    if (index !== -1) {
      favoritos.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(favoritos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};

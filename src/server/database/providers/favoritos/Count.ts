import { readFileSync } from 'fs';
import path from 'path';
import { IFavorito } from '../../models';

export const count = async (titulo = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_favoritos.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const favoritos = JSON.parse(fileData);

    const registrosFiltrados = favoritos.filter((favorito: IFavorito) =>
      favorito.titulo.toLowerCase().includes(titulo.toLowerCase())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};

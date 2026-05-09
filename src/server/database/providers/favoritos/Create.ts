import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFavorito } from '../../models';

export const create = async (favorito: Omit<IFavorito, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../01_favoritos.json');
      let favoritos: IFavorito[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          favoritos = JSON.parse(fileData);
        }
      }

      const novoId = favoritos.length > 0
        ? Math.max(...favoritos.map((f) => Number(f.id) || 0)) + 1
        : 1;


      const dataAtual = new Date();
      const novoRegistro: IFavorito = {
        ...favorito,
        id: novoId,
        created_at: dataAtual,
        updated_at: dataAtual,
      } as IFavorito;

      favoritos.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(favoritos, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};

import { readFileSync } from 'fs';
import path from 'path';
import { ILivro } from '../../models';

export const count = async (titulo = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../00_livros.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const livros = JSON.parse(fileData);

    const registrosFiltrados = livros.filter((livro: ILivro) =>
      livro.titulo.toLowerCase().includes(titulo.toLowerCase())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};

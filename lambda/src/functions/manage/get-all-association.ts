import { getAllAssociationService } from '../../services/manage/association/association-services';

exports.handler = async (event: any) => {
  console.log(event);
  try {
    const associate = await getAllAssociationService();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        data: associate
      })
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Erro ao criar usuário',
        error: error.message
      })
    };
  }
};

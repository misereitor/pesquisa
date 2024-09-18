import { deleteAssociationService } from '../../services/manage/association/association-services';

exports.handler = async (event: any) => {
  const { id_category, id_company } = JSON.parse(event.body);
  try {
    await deleteAssociationService(id_category, id_company);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado'
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

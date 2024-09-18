import { createAssociationByCategoryArrayService } from '../../services/manage/association/association-services';
import { AssociationCategoryAndCompany } from '../../types/association-company-category';

exports.handler = async (event: any) => {
  try {
    const association: AssociationCategoryAndCompany[] = JSON.parse(event.body);
    await createAssociationByCategoryArrayService(association);
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

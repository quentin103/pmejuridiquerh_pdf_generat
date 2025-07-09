import { userTemplate } from './user.template';
import { orderTemplate } from './order.template';
import { invoiceTemplate } from './invoice.template';
import { reportTemplate } from './report.template';
import { attestationCongesMaterniteTemplate } from './attestationconges-maternite.template';
import { attestationCongesTemplate } from './attestation-conges.template';
import { attestationRepriseServiceTemplate } from './attestation-reprise-service.template';
import { attestationStageEcoleTemplate } from './attestation-stage-ecole.template';
import { attestationTravailTemplate } from './attestation-travail.template';
import { attestationStageQualificationTemplate } from './attestation-stage-qualification.template';


export const allPdfTemplate = [
    userTemplate,
    orderTemplate,
    invoiceTemplate,
    reportTemplate,
    attestationCongesMaterniteTemplate,
    attestationCongesTemplate,
    attestationRepriseServiceTemplate,
    attestationStageEcoleTemplate,
    attestationTravailTemplate,
    attestationStageQualificationTemplate
];
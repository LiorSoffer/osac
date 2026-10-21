import { Content, Stack, StackItem, Title } from '@patternfly/react-core';
import { useFormikContext } from 'formik';

import { SecretType } from '@osac/types';
import OsacForm from '@osac/ui-components/components/Form/OsacForm';

import { useTranslation } from '../../../../hooks/useTranslation';
import SecretDataField from '../fields/SecretDataField';
import SecretTypeField from '../fields/SecretTypeField';
import type { SecretValues } from '../values';

interface SecretDataStepProps {
  isEdit: boolean;
}

const getPrimaryValueLabel = (type: SecretType, t: (key: string) => string): string | undefined => {
  switch (type) {
    case SecretType.KUBECONFIG:
      return t('Kubeconfig');
    case SecretType.PULL_SECRET:
      return t('Pull secret');
    case SecretType.USER_DATA:
      return t('User data');
    case SecretType.SSH_PUBLIC_KEY:
      return t('SSH public key');
    case SecretType.VALUE:
      return t('Value');
    default:
      return undefined;
  }
};

const SecretDataStep = ({ isEdit }: SecretDataStepProps) => {
  const { t } = useTranslation();
  const { values } = useFormikContext<SecretValues>();
  const typeLabel = getPrimaryValueLabel(values.type, t);

  return (
    <Stack hasGutter>
      <StackItem>
        <Title headingLevel="h2" size="lg">
          {t('Secret data')}
        </Title>
        <Content component="p">
          {t('Select a secret type, then enter or upload its key(s) and values.')}
        </Content>
      </StackItem>
      <StackItem>
        <OsacForm>
          <SecretTypeField isEdit={isEdit} />
          <SecretDataField typeLabel={typeLabel} />
        </OsacForm>
      </StackItem>
    </Stack>
  );
};

export default SecretDataStep;

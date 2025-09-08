interface Props {
  children: React.ReactNode;
}

import PublicLayoutClient from './PublicLayoutClient';

const PublicLayout = ({ children }: Props) => {
  return <PublicLayoutClient>{children}</PublicLayoutClient>;
};

export default PublicLayout;

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const currentDate = format(new Date(), 'EEEEEE, d, MMMM', { locale: ptBR });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcaster" />

      <p>O melhor para você ouvir, sempre.</p>

      <span>{currentDate}</span>
    </header>
  );
};

export default Header;

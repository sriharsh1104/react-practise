import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../../Redux/Slice/themeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <div>Header</div>
      <button onClick={handleToggleTheme} style={{ padding: '0.5rem 1rem', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>
        {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
      </button>
    </div>
  );
};

export default Header;
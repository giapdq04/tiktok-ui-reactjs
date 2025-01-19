import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Wrapper from '~/components/Popper/Wrapper';
import MenuItem from '~/components/Popper/Menu/MenuItem.';

const cx = classNames.bind(styles);


function Menu({ children, items }) {

    const renderItems = () =>
        items.map((item, index) =>
            <MenuItem data={item} key={index} />,
        );

    return (
        <Tippy
            delay={[0, 700]}
            interactive
            placement={'bottom-end'}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <Wrapper className={cx('menu-popper')}>
                        {renderItems()}
                    </Wrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
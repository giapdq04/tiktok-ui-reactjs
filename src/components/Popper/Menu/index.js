import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Wrapper from '~/components/Popper/Wrapper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);


function Menu({
    children, items,
    onChange = () => {
    },
    hideOnClick = false
}) {

    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1];

    const renderItems = () =>
        current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem data={item} key={index} onClick={() => {
                    if (isParent) {
                        setHistory([...history, item.children]);
                    } else {
                        onChange(item);
                    }
                }} />
            );
        },
        );

    return (
        <Tippy
            offset={[12, 8]}
            delay={[0, 500]}
            onHide={() => {
                setHistory(prev => prev.slice(0, 1));
            }}
            hideOnClick={hideOnClick}
            interactive
            placement={'bottom-end'}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <Wrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title={'Language'} onBack={() => {
                            setHistory(prevState => prevState.slice(0, prevState.length - 1));
                        }} />}
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
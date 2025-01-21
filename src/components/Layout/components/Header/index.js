import {
    faArrowRightFromBracket,
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import 'tippy.js/dist/tippy.css';

import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import images from '~/assets/images';
import Button from '~/components/Button';
import { UploadIcon } from '~/components/Icons';
import { Image } from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;
    

    const handleMenuChange = (menuItem) => {

    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faBitcoin} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },

        ...MENU_ITEM,

        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];


    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="Tiktok" />

                <Search />


                <div className={cx('actions')}>

                    {
                        currentUser ? (
                            <Tippy delay={[0, 200]} content={'Upload video'} placement={'bottom'}>
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                        ) : (
                            <>
                                <Button text>Upload</Button>
                                <Button primary>Log in</Button>

                            </>
                        )
                    }

                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>

                        {currentUser ? (
                            <Image
                                // errorImage='https://lh3.googleusercontent.com/ogw/AF2bZyjjFRMCWUzpP30Glo_X9xJAm55RgFF2pPXAHQKvrgwoUVOD=s32-c-mo'
                                className={cx('user-avatar')}
                                src="https://s.net.vn/CPrx123" alt="nguyen van a" />
                        ) : (<button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>)
                        }


                    </Menu>

                </div>

            </div>
        </header>
    );
}

export default Header;

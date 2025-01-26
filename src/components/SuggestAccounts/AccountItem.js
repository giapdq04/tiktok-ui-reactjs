import React from 'react';
import classNames from 'classnames/bind';
import style from './SuggestAccounts.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper } from '../Popper';
import AccountPreview from './AccountPreview/AccountPreview';

const cx = classNames.bind(style);

function AccountItem() {

    const renderPreview = (props) => (
        <div tabIndex={-1} {...props}>
            <Wrapper>
                <AccountPreview />
            </Wrapper>
        </div>
    )
    return (
        <div>
            <Tippy
                interactive
                delay={[800, 0]}
                offset={[-20, 0]}
                placement='bottom'
                render={(attr) => renderPreview(attr)}
            >
                <div className={cx('account-item')}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0XXXRYnooOI2owR49umm_GOVvA2uEvijnKw&s"
                        alt=""
                        className={cx('avatar')}
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>quocanh</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Quoocs nguyen phu</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
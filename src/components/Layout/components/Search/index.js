import {
    faCircleXmark,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const searchInputRef = useRef()
    useEffect(() => {
        if (searchValue.length === 0) {
            setSearchResult([]);
            return;
        }

        setLoading(true);
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then(res => res.json())
            .then(result => {
                setSearchResult(result.data)
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                console.error(e);
            });


        setLoading(false);
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        searchInputRef.current.focus();
    }

    const handleHideResult = () => {
        setShowResult(false);
    }

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchValue.length > 0}
            onClickOutside={handleHideResult}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {
                            searchResult.map(account => (
                                <AccountItem key={account.id} account={account} />
                            ))
                        }
                    </PopperWrapper>
                </div>
            )}
        >
            <div className={cx('search')}>
                <input
                    ref={searchInputRef}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onFocus={() => setShowResult(true)}
                />
                {
                    searchValue.length > 0 && !loading && (
                        <button onClick={handleClear} className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )
                }
                {
                    loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                }

                <button className={cx('search-btn')}>
                    <SearchIcon width='1.9rem' height='1.9rem' />
                </button>
            </div>
        </HeadlessTippy>
    )
}

export default Search
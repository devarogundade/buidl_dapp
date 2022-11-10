import Vue from "vue"
import WalletConnectProvider from "@walletconnect/web3-provider"
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

export default ({}, inject) => {
    inject('auth', Vue.observable({
        provider: null,
        accounts: [],
        lastProviderName: '',
        lastNetworkName: '',

        checkAuth: async function(prompt = true) {
            this.lastProviderName = this.getLastProviderName()
            this.lastNetworkName = this.getLastNetworkName()
            if (this.lastProviderName != '' && prompt) {
                await this.connectWallet(this.lastProviderName)
            }
            $nuxt.$emit('switch-network-to', this.lastNetworkName)
        },

        getLastProviderName: function() {
            if (typeof(Storage) !== "undefined") {
                return localStorage.getItem('last-provider-name') ? localStorage.getItem('last-provider-name') : ''
            }
            return ''
        },

        getLastNetworkName: function() {
            if (typeof(Storage) !== "undefined") {
                return localStorage.getItem('last-network-name') ? localStorage.getItem('last-network-name') : 'bsc'
            }
            return 'bsc'
        },

        saveLastProviderName: function(name) {
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('last-provider-name', name)
            }
        },

        deleteLastProviderName: function() {
            if (typeof(Storage) !== "undefined") {
                localStorage.removeItem('last-provider-name')
            }
        },

        requestWalletConnection: function() {
            $nuxt.$emit('request-connect-wallet')
        },

        quitWalletConnection: function() {
            $nuxt.$emit('release-connect-wallet')
        },

        connectWallet: async function(wallet) {
            if (wallet == 'metamask') {
                if (typeof ethereum !== 'undefined') {
                    $nuxt.$emit('connecting-wallet', `Connecting to metamask`)

                    const address = await this.connectToMetaMask()
                    if (address != null) {
                        $nuxt.$emit('connected', {
                            message: `Connected to ${address}`,
                            wallet: wallet,
                            account: address
                        })
                    } else {
                        $nuxt.$emit('error', 'Failed to connect')
                    }
                } else {
                    $nuxt.$emit('error', 'You don\'t have metamask installed')
                }
            }

            if (wallet == 'coinbase') {
                $nuxt.$emit('connecting-wallet', `Connecting to Coinbase`)

                const address = await this.connectToCoinbase()
                if (address != null) {
                    $nuxt.$emit('connected', {
                        message: `Connected to ${address}`,
                        wallet: wallet,
                        account: address
                    })
                } else {
                    $nuxt.$emit('error', 'Failed to connect')
                }
            }

            if (wallet == 'walletconnect') {
                $nuxt.$emit('connecting-wallet', `Connecting to Walletconnect`)

                const address = await this.connectToWC()
                if (address != null) {
                    $nuxt.$emit('connected', {
                        message: `Connected to ${address}`,
                        wallet: wallet,
                        account: address
                    })
                } else {
                    $nuxt.$emit('error', 'Failed to connect')
                }
            }
        },

        disconnect() {
            $nuxt.$emit('disconnected')
        },

        connectToMetaMask: async function() {
            try {
                await ethereum.request({
                    method: 'eth_requestAccounts'
                });
                this.provider = ethereum
                await this.switchToNetwork(this.getLastNetworkName())

                this.setUpAccountListeners(ethereum)

                this.accounts = await ethereum.enable();

                this.saveLastProviderName('metamask')
                return this.accounts[0]
            } catch (error) {
                $nuxt.$emit('error', error.message)
                return null
            }
        },

        connectToCoinbase: async function() {
            try {
                const coinbaseWallet = new CoinbaseWalletSDK({
                    appName: "Buidl",
                    appLogoUrl: "/favicon.ico",
                    darkMode: true
                })

                this.provider = coinbaseWallet.makeWeb3Provider(
                    `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`, 97
                )

                this.setUpAccountListeners(this.provider)

                this.accounts = await this.provider.enable();

                this.saveLastProviderName('coinbase')
                return this.accounts[0]
            } catch (error) {
                $nuxt.$emit('error', error)
            }
        },

        connectToWC: async function() {
            try {
                this.provider = new WalletConnectProvider({
                    infuraId: process.env.INFURA_KEY,
                    rpc: {
                        56: "https://bsc-dataseed3.binance.org",
                        97: "https://data-seed-prebsc-1-s2.binance.org:8545"
                    },
                    qrcodeModalOptions: {
                        desktopLinks: [
                            'ledger',
                            'tokenary',
                            'wallet',
                            'wallet 3',
                            'secuX',
                            'ambire',
                            'wallet3',
                            'apolloX',
                            'zerion',
                            'sequence',
                            'punkWallet',
                            'kryptoGO',
                            'nft',
                            'riceWallet',
                            'vision',
                            'keyring'
                        ],
                        mobileLinks: [
                            "rainbow",
                            "metamask",
                            "argent",
                            "trust",
                            "imtoken",
                            "pillar",
                        ],
                    },
                });

                this.setUpAccountListeners(this.provider)

                this.accounts = await this.provider.enable();

                this.saveLastProviderName('walletconnect')
                return this.accounts[0]
            } catch (error) {
                $nuxt.$emit('error', error)
            }
        },

        setUpAccountListeners: function(provider) {
            provider.on("accountsChanged", (accounts) => {
                this.accounts = accounts
                $nuxt.$emit('accounts-changed', this.accounts)
                if (accounts.length == 0) {
                    $nuxt.$emit('disconnected')
                    this.deleteLastProviderName()
                }
            });

            provider.on("chainChanged", (chainId) => {
                $nuxt.$emit('chain-changed', chainId)
            });
        },

        switchToBinanceTestnet: async function() {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x61' }],
                });
            } catch (error) {
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x61',
                                chainName: 'Smart Chain - Testnet',
                                nativeCurrency: {
                                    name: 'Binance',
                                    symbol: 'BNB', // 2-6 characters long
                                    decimals: 18
                                },
                                blockExplorerUrls: ['https://testnet.bscscan.com'],
                                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                            }, ],
                        });
                    } catch (addError) {
                        console.error(addError);
                    }
                }
            }
        },

        switchToPolygonMumbai: async function() {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x13881' }],
                });
            } catch (error) {
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x13881',
                                chainName: 'Polygon - Mumbai',
                                nativeCurrency: {
                                    name: 'Matic',
                                    symbol: 'MATIC', // 2-6 characters long
                                    decimals: 18
                                },
                                blockExplorerUrls: ['https://mumbai.polygonscan.com'],
                                rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
                            }, ],
                        });
                    } catch (addError) {
                        console.error(addError);
                    }
                }
            }
        },

        switchToNetwork: async function(name) {
            switch (name) {
                case 'polygon':
                    this.switchToPolygonMumbai()
                    break
                default:
                    this.switchToBinanceTestnet()
                    break
            }
        }
    }))
}
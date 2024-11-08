// Types
interface Asset {
    id: string;
    symbol: string;
    name: string;
    balance: number;
    priceChange: number;
    iconSymbol: string;
  }
  
  interface WalletScreenProps {
    assets?: Asset[];
    username?: string;
    profileImage?: string;
  }
  
  // App.tsx
  import React from 'react';
  import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
  } from 'react-native';
  import { StatusBar } from 'expo-status-bar';
  
  const DEFAULT_ASSETS: Asset[] = [
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 5000.00,
      priceChange: 2.5,
      iconSymbol: '⟠'
    },
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 4500.00,
      priceChange: -1.2,
      iconSymbol: '₿'
    },
    {
      id: 'usd-coin',
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 100.00,
      priceChange: 0.0,
      iconSymbol: '$'
    }
  ];
  
  export const WalletScreen: React.FC<WalletScreenProps> = ({
    assets = DEFAULT_ASSETS,
    username = 'raad.eth',
    profileImage
  }) => {
    const [activeTab, setActiveTab] = React.useState('Assets');
    const totalBalance = assets.reduce((sum, asset) => sum + asset.balance, 0);
  
    const formatCurrency = (amount: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };
  
    const formatPriceChange = (change: number): string => {
      const sign = change >= 0 ? '+' : '';
      return `(${sign}${change}%)`;
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.profileContainer}>
              <Image
                source={profileImage ? { uri: profileImage } : require('./assets/default-avatar.png')}
                style={styles.profileImage}
              />
              <Text style={styles.username}>{username}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
  
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(totalBalance)}</Text>
          </View>
  
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.requestButton}>
              <Text style={styles.requestButtonText}>Request</Text>
            </TouchableOpacity>
          </View>
  
          {/* Tabs */}
          <View style={styles.tabs}>
            {['Assets', 'NFTs', 'DeFi'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Asset List */}
          <View style={styles.assetList}>
            {assets.map((asset) => (
              <View key={asset.id} style={styles.assetItem}>
                <View style={styles.assetIcon}>
                  <Text style={styles.assetIconText}>{asset.iconSymbol}</Text>
                </View>
                <View style={styles.assetInfo}>
                  <Text style={styles.assetName}>{asset.name}</Text>
                  <Text style={styles.assetDetails}>
                    {asset.symbol} · {formatCurrency(asset.balance)}{' '}
                    <Text
                      style={[
                        styles.priceChange,
                        asset.priceChange >= 0
                          ? styles.positiveChange
                          : styles.negativeChange
                      ]}
                    >
                      {formatPriceChange(asset.priceChange)}
                    </Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
  
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <Text style={styles.bottomNavIcon}>👛</Text>
          <Text style={[styles.bottomNavIcon, styles.inactiveIcon]}>📊</Text>
          <Text style={[styles.bottomNavIcon, styles.inactiveIcon]}>🧭</Text>
          <Text style={[styles.bottomNavIcon, styles.inactiveIcon]}>👤</Text>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollView: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    username: {
      fontSize: 18,
      fontWeight: '500',
    },
    settingsIcon: {
      fontSize: 24,
    },
    balanceCard: {
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      padding: 24,
      margin: 16,
    },
    balanceLabel: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 4,
    },
    balanceAmount: {
      fontSize: 28,
      fontWeight: '700',
    },
    actionButtons: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      gap: 16,
      marginBottom: 24,
    },
    payButton: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    requestButton: {
      flex: 1,
      backgroundColor: '#000',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    payButtonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    requestButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#fff',
    },
    tabs: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 24,
      gap: 24,
    },
    tab: {
      paddingVertical: 8,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#000',
    },
    tabText: {
      fontSize: 16,
      color: '#666',
    },
    activeTabText: {
      color: '#000',
      fontWeight: '500',
    },
    assetList: {
      paddingHorizontal: 16,
    },
    assetItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      marginBottom: 12,
      gap: 16,
    },
    assetIcon: {
      width: 40,
      height: 40,
      backgroundColor: '#E0E0E0',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    assetIconText: {
      fontSize: 20,
    },
    assetInfo: {
      flex: 1,
    },
    assetName: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 2,
    },
    assetDetails: {
      fontSize: 14,
      color: '#666',
    },
    priceChange: {
      fontSize: 14,
    },
    positiveChange: {
      color: '#4CAF50',
    },
    negativeChange: {
      color: '#F44336',
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
    bottomNavIcon: {
      fontSize: 24,
    },
    inactiveIcon: {
      opacity: 0.5,
    },
  });
  
  export default WalletScreen;
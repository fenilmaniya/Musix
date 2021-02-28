import { StyleSheet, Platform } from 'react-native';
import { colors, device, gStyle } from '../../constants';

const styles = StyleSheet.create({
  containerSearchBar: {
    ...gStyle.pH3,
    backgroundColor: colors.blackBg,
    paddingBottom: 16,
    paddingTop: device.iPhoneNotch ? 64 : 24
  },
  searchPlaceholder: {
    alignItems: 'center',
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 6,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingVertical: 8
  },
  searchPlaceholderText: {
    ...gStyle.textSpotify16,
    color: colors.blackBg
  },
  sectionHeading: {
    ...gStyle.textSpotifyBold18,
    color: colors.white,
    marginBottom: 24,
    marginLeft: 24,
    marginTop: 16
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 24
  },
  containerColumn: {
    width: '50%'
  },
  iconRight: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
    position: 'absolute',
    right: 24,
    top: device.web ? 40 : 50,
    width: 28
  },
  searchInput: {
		textAlign: 'left',
    flex: 1,
    color: colors.black,
		backgroundColor: 'transparent',
		...Platform.select({
			ios: {
				fontFamily: 'System',
				fontWeight: '400'
			},
			android: {
				includeFontPadding: false,
				fontFamily: 'spotify-reguler',
				fontWeight: 'normal'
			}
		}), 
		fontSize: 16,
		paddingHorizontal: 14,
		borderRadius: 2
	},
});

export default styles;
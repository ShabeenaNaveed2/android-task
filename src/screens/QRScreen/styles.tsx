import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors'
import { INTER_BOLD, INTER_MEDIUM } from '../../styles/font';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.GrayishWhite,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: INTER_BOLD,
    color: colors.Black,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.White,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    elevation: 3,
    shadowColor: colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: INTER_MEDIUM,
    marginBottom: 12,
    color: colors.DarkGray,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  toggleButton: {
    width: '45%',
    alignSelf: 'center',
    backgroundColor: colors.Black,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: colors.White,
    fontSize: 16,
    fontFamily: INTER_MEDIUM,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  resultText: {
    fontSize: 16,
    color: colors.DarkGray,
    lineHeight: 22,
  },
});
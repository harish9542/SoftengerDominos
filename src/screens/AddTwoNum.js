import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  ADD_TWO_NUMBERS,
  FIRST_NUMBER,
  SECOND_NUMBER,
  TOTAL,
} from '../constants/strings';
import {showErrorToast} from '../components/Toast';
import CustomButton from '../components/custom/CustomButton';
import CustomTextInput from '../components/custom/CustomTextInput';

const AddTwoNumScreen = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleAdd = () => {
    if (!num1 || !num2) {
      setResult('');
      showErrorToast({
        message: 'Both numbers are required',
      });
      return;
    }
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum);
  };

  const twoSum = (numbers, target) => {
    if (!numbers || !target) {
      return;
    }

    const sumIndices = [];

    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
      const sum = numbers[left] + numbers[right];
      if (sum === target) {
        sumIndices.push(left + 1, right + 1);
        break;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
    console.log(
      sumIndices.length === 2 ? sumIndices : 'No valid indices found',
    );
    return sumIndices.length === 2 ? sumIndices : 'No valid indices found';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ADD_TWO_NUMBERS}</Text>
      <CustomTextInput
        keyboardType="numeric"
        placeholder={FIRST_NUMBER}
        value={num1}
        onChangeText={setNum1}
      />
      <CustomTextInput
        keyboardType="numeric"
        placeholder={SECOND_NUMBER}
        value={num2}
        onChangeText={setNum2}
      />
      <CustomButton title="Add" onPress={handleAdd} />
      <Text style={styles.result}>
        {TOTAL} {result !== null && result}
      </Text>
      <CustomButton title="Task 3" onPress={() => twoSum([2, 7, 11, 15], 9)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    marginBottom: 20,
    // textAlign: 'center',
  },
});

export default AddTwoNumScreen;

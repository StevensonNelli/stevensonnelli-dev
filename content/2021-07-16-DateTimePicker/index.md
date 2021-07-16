---
title: "DateTimePicker issue (react-widgets)"
path: blog/date-time-picker
tags: [javascript, reactjs]
cover: ./date-time-picker.jpg
date: 2021-07-16
excerpt: Issue with DateTimePicker widget.
---

# DateTimePicker issue (react-widgets)

**Version**: 4.5

**Issue**: On entered non-standard date format (DD/MM/YYYY hh:mm:ss) value in the DateTimePicker field through the keyboard, the field is getting null value.

**Expected result**: When a user types a value into the textbox, it needs to be parsed into a proper date object

**Investigation/Debugging**: On debugging the library code, On calendar selection change event is giving date object but on manual field edit, the library is firing onblur event and that event is capturing field value as a string but that string value is not able to parse as a valid date object and it's returning null and the same null value is carry forwarding for next relay events like parse, onchange and so on. Localizer is also not able to parse the non-standard date-format values.

**Is upgrading library version to 5.x giving solution?** : I personally felt that UX and usage are improved in the latest version. They renamed DateTimePicker as a DatePicker and it doesn't support time picking by default. They created a new component for the time picker called TimeInput and you can use both of them as a single field by providing **includeTime** prop to the DatePicker component.

Still, the latest version is also having the following issues

- On entering the non-standard date, it is getting empty
- After entering invalid input, the Calendar is not working. The user is not able to select any date.
- Time input is populating with NaN value after entering invalid input.
- Use has to clear that NaN time value through cross icon then only he/she can re-use the date picker properly.
- No **IE** support

**Solution**: After spending some time on the latest version, I returned to the 4.5 version due to some existing issues and a lack of IE support.

Both version components are accepting the **parse** property for external parses so we can override the library/localizer's parse methods. I have written own parsing method for non-standard date value parsing and return date object and this date object will be passed to the next relay events including onchange and retain by field.

```jsx
import { DateTimePicker } from 'react-widgets';
import { parseDate } from 'helper';
const DateField = () => {
	return (
		<DateTimePicker
      format={'DD/MM/YYYY hh:mm:ss'}
			placeholder={'Select/Eneter valid date'}
			parse={parseDate}
    />
};

export default DateField;
```

```jsx
// Write your own parsing code in your helper.
export const parseDate = (pDate) {
      let dd = pDate.split("/")[0].padStart(2, "0");
      let mm = pDate.split("/")[1].padStart(2, "0");
      let yyyy = pDate.split("/")[2].split(" ")[0];
      let hh = pDate.split("/")[2].split(" ")[1].split(":")[0].padStart(2, "0");
      let mi = pDate.split("/")[2].split(" ")[1].split(":")[1].padStart(2, "0");
      let secs = pDate.split("/")[2].split(" ")[1].split(":")[2].padStart(2, "0");
      mm = (parseInt(mm) - 1).toString(); // January is 0
      return new Date(yyyy, mm, dd, hh, mi, secs);
  }
// Note: The above code snippet is not a standard code. Still, there are issues with it
```

import { Animated, LayoutAnimation, StyleSheet, View } from 'react-native';
import VSChipHeaderText from './text/VSChipHeaderText';
import VSChipCategoryText from './text/VSChipCategoryText';
import VSChipAuthorListText from './text/VSChipAuthorListText';
import VSBodyText from './text/VSBodyText';
import VSAbstractText from './text/VSAbstractText';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureDetector, Gesture, RectButton } from 'react-native-gesture-handler';
import { useState, useRef, useEffect } from 'react';
import { palette } from '../assets/palette';
import { FontAwesome5 } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';

const VSArticleChip = ({children, data, navigation}) => {

    translateX = new Animated.Value(0);
    scaleY = new Animated.Value(0);
    rotate = new Animated.Value(0);

    const {height, width} = useWindowDimensions();
    const [isReadingListHidden, setIsReadingListHidden] = useState(false);
    const [addedToReadingList, setAddedToReadingList] = useState(false);

    chipRef = useRef(null)
    const [measure, setMeasure] = useState(null);

    function updateMeasure() {
        console.log("change")
        if (chipRef.current) {
            chipRef.current.measure(
              (left, top, width, height) => {
                setMeasure({left, top, width, height});
              },
            );
        }
    }

    renderLeftActions = (progress, dragX) => {
        trans = dragX.interpolate({
          inputRange: [0, width],
          outputRange: [-20, (2 * width / 7)],
        });
        opaq = progress.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [0, 100, 100],
        });
        return (
            addedToReadingList ? (
                <RectButton style={styles.leftAction} activeOpacity={0}>
                    <Animated.View
                    style={[
                        styles.actionView,
                        {
                            transform: [{translateX: trans}],
                            transformOrigin: 'center center',
                            opacity: opaq
                        },
                    ]}>
                        <View style={styles.innerLeft}>
                            <FontAwesome5 name="check" size={24} color={palette.lightgreen} />
                            <VSBodyText size={18} color={palette.lightgreen}>Added to Reading List</VSBodyText>
                        </View>
                    </Animated.View>
                </RectButton>
            ) : (
                <RectButton style={styles.leftAction} activeOpacity={0}>
                    <Animated.View
                    style={[
                        styles.actionView,
                        {
                            transform: [{translateX: trans}],
                            transformOrigin: 'center center',
                            opacity: opaq
                        },
                    ]}>
                        <View style={styles.innerLeft}>
                            <FontAwesome5 name="book" size={24} color={palette.medgray} />
                            <VSBodyText size={18} color={palette.medgray}>Add to Reading List</VSBodyText>
                        </View>
                    </Animated.View>
                </RectButton>
            )
        );
    };

    const tap = Gesture.Tap().maxDeltaX(30).onStart(() => {
        navigation.navigate('Article')
    })

    const handleSwipeOpen = () => {
        setAddedToReadingList(true);
        setTimeout(() => {
            setIsReadingListHidden(true);
        }, 750);
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    return (
        <Swipeable renderLeftActions={renderLeftActions} onSwipeableOpen={handleSwipeOpen}>
            <Animated.View ref={chipRef} style={{...styles.chip, display: (isReadingListHidden ? 'none' : 'flex'), transform: [{"rotate": translateX + "deg"}],}}>
                <View style={styles.inner}>
                    <View style={styles.category}>
                        {data.category && <VSChipCategoryText navigation={navigation}>{data.category}</VSChipCategoryText>}
                    </View>
                    <GestureDetector gesture={tap}>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                {data.header && <VSChipHeaderText>{data.header}</VSChipHeaderText>}
                            </View>
                            <View style={styles.authors}>
                                {data.authors && <VSChipAuthorListText>{data.authors}</VSChipAuthorListText>}
                            </View>
                            <View>
                                {data.abstract && <VSAbstractText>{data.abstract}</VSAbstractText>}
                            </View>
                        </View>
                    </GestureDetector>
                </View>
            </Animated.View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    chip: {
        flex: 1,
        flexDirection: "column",
        rowGap: 4,
        backgroundColor: "white",
        padding: 15,
        paddingBottom: 40,
        shadowColor: "#222222",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        borderRadius: 8,
        margin: 20,
        marginTop: 10,
        marginBottom: 10,

        transformOrigin: "left bottom",

    },
    inner: {
        backgroundColor: "#ffffff",
    },
    header: {
        marginBottom: 5
    },
    category: {

    },
    authors: {
        marginBottom: 20
    },
    leftAction: {
        width: "100%",
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'left',
        height: "100%",
    },
    actionView: {
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: -1,
        color: palette.matched.orange.text,
        fontFamily: "DMSans-Regular",
        padding: 8,
        borderRadius: 10
    },
    innerLeft: {
        flexDirection: "column",
        alignItems: 'center',
        gap: 3
    },
    shadow: {
        shadowColor: "#222222",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
    }
});

export default VSArticleChip;
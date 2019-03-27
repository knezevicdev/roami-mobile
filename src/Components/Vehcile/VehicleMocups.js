<View style={styles.parentView}>
    <View style={styles.childViewHeader}>
        <Text style={styles.paragraphBold}>3 days ago</Text>
        <Text style={styles.paragraphLight}>Last GPS Signal</Text>
    </View>
    <View style={styles.childViewHeader}>
        <Text style={styles.paragraphBold}>2 months ago</Text>
        <Text style={styles.paragraphLight}>Last Ride</Text>
    </View>
    <View style={styles.inBetweenLine} />
    <View style={styles.childViewFooter}>
        <TouchableOpacity style={styles.paragraphTouchable}>
            <Text style={styles.paragraphTouchable}>
                <FontAwesome>{Icons.bell}</FontAwesome>
                {" "}Ring
            </Text>
        </TouchableOpacity>
    </View>
    <View style={styles.childViewFooter}>
        <TouchableOpacity style={styles.paragraphTouchable}>
            <Text style={styles.paragraphTouchable}>
                <FontAwesome>
                    {Icons.locationArrow}
                </FontAwesome>
                {" "}Navigate
            </Text>
        </TouchableOpacity>
    </View>
    <View style={styles.childViewFooter}>
        <TouchableOpacity style={styles.paragraphTouchable}>
            <Text style={styles.paragraphTouchable}>
                <FontAwesome>
                    {Icons.exclamationTriangle}
                </FontAwesome>
                {" "}Report
            </Text>
        </TouchableOpacity>
    </View>
</View>

/*********************************************************** */

const styles = StyleSheet.create({
    paragraphBold: {
        marginLeft: "10%",
        marginTop: "10%",
        marginRight: "10%",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    paragraphLight: {
        fontSize: 10,
        textAlign: "center",
        color: 'silver'
    },
    paragraphTouchable: {
        marginLeft: "10%",
        marginBottom: "10%",
        marginRight: "10%",
        fontSize: 12,
        textAlign: "center",
        color: '#79D120'
    },
    parentView: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "5%"
    },
    childViewHeader: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        overflow: "hidden",
        width: "49%"
    },
    childViewFooter: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        overflow: "hidden",
        width: "32%"
    },
    inBetweenLine: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "silver",
        overflow: "hidden",
        width: "90%",
        marginLeft: "5%",
        marginTop: "2%",
        marginBottom: "2%"
    }
});

/****************************************** */

<View style={styles.parentView}>
    <Text style={styles.paragraphBold}>
        <FontAwesome>
            {Icons.car}
        </FontAwesome>
        {" "}No. XXX-738
    </Text>
    <Text style={styles.paragraphBold}>
        <FontAwesome>
            {Icons.warehouse}
        </FontAwesome>
        {" "}Drop off at LimeBase
    </Text>
</View>

const styles = StyleSheet.create({
    parentView: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "silver",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "5%",
        maxWidth: "50%"
    },
    paragraphBold: {
        margin: '5%',
        fontSize: 12,
        textAlign: "left"
    },
    icon: {
        marginRight: '25%',
    },
});

/************************************************* */

<TouchableHighlight style={styles.touchableCircle}
    underlayColor = '#ccc'
    onPress = { () => alert('Yaay!') }
    >
    <Text style={styles.paragraphBold}>
        <FontAwesome>
            {Icons.compass}
        </FontAwesome>
    </Text>
</TouchableHighlight>

const styles = StyleSheet.create({
    touchableCircle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        backgroundColor:'silver',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paragraphBold: {
        margin: '5%',
        fontSize: 60,
    }
});

<TouchableHighlight style={styles.touchableCircle}
    underlayColor = '#ccc'
    onPress = { () => alert('Yaay!') }
    >
    <Text style={styles.paragraphBold}>
        <FontAwesome>
            {Icons.sync}
        </FontAwesome>
    </Text>
</TouchableHighlight>

/*{          id: 1,
           code: 'TEST01',
           creationTime: '2018-05-02T16:33:07.906855Z',
           updateTime: '2019-02-05T12:17:03.351Z',
           licensePlate: 'W-4GOGO',
           stateOfCharge: 89,
           type: 'NINEBOT_ES2',
           serviceState: 'OPERATIONAL',
           apiId: '2;1;error',
           position: 
            { type: 'Point',
              coordinates: [ 16.332761277174555, 48.212386516392954 ] },
           address: 'Friedmanngasse 33, 1160 Wien, Austria',
           kilometers: 225.55210403679214,
           rentalState: 'AVAILABLE',
           legalInspectionDate: '2019-09-30',
           backendNotes: 'test 123 etst',
           numberOfPersons: 1,
           remainingKilometers: 19.75,
           typeName: 'Ninebot ES2' 
}*/
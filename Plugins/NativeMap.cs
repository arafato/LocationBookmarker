using System;
using WPCordovaClassLib.Cordova;
using WPCordovaClassLib.Cordova.Commands;
using WPCordovaClassLib.Cordova.JSON;
using Microsoft.Phone.Tasks;
using System.Device.Location;

namespace Cordova.Extension.Commands
{
    public class NativeMap : BaseCommand
    {
        public void show(string options)
        {
            var longitude = Convert.ToDouble(JsonHelper.Deserialize<string[]>(options)[0]);
            var latitude = Convert.ToDouble(JsonHelper.Deserialize<string[]>(options)[1]);

            var mapsDirectionsTask = new MapsDirectionsTask();
            var coords = new GeoCoordinate(latitude, longitude);
            var location = new LabeledMapLocation("Target", coords);
            mapsDirectionsTask.End = location;
            mapsDirectionsTask.Show();
        }
    }
}

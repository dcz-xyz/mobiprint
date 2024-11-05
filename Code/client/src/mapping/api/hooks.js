/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useSnackbar } from "notistack";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTimer, fetchAutoEmptyDockAutoEmptyControlState, fetchCapabilities, fetchCarpetModeState, fetchCombinedVirtualRestrictionsPropertiesProperties, fetchConsumableStateInformation, fetchCurrentStatistics, fetchCurrentStatisticsProperties, fetchDoNotDisturbConfiguration, fetchHTTPBasicAuthConfiguration, fetchKeyLockState, fetchManualControlProperties, fetchManualControlState, fetchMap, fetchMapSegmentationProperties, fetchMQTTConfiguration, fetchMQTTProperties, fetchNTPClientConfiguration, fetchNTPClientState, fetchPersistentDataState, fetchPresetSelections, fetchRobotInformation, fetchSegments, fetchSpeakerVolumeState, fetchStateAttributes, fetchSystemHostInfo, fetchSystemRuntimeInfo, fetchTimerInformation, fetchTimerProperties, fetchTotalStatistics, fetchTotalStatisticsProperties, fetchUpdaterState, fetchValetudoEvents, fetchValetudoVersionInformation, fetchValetudoLog, fetchValetudoLogLevel, fetchVoicePackManagementState, fetchWifiStatus, fetchZoneProperties, sendAutoEmptyDockAutoEmptyControlEnable, sendAutoEmptyDockManualTriggerCommand, sendBasicControlCommand, sendCarpetModeEnable, sendCleanSegmentsCommand, sendCleanTemporaryZonesCommand, sendCombinedVirtualRestrictionsUpdate, sendConsumableReset, sendDoNotDisturbConfiguration, sendGoToCommand, sendHTTPBasicAuthConfiguration, sendJoinSegmentsCommand, sendKeyLockEnable, sendLocateCommand, sendManualControlInteraction, sendMapReset, sendMQTTConfiguration, sendNTPClientConfiguration, sendPersistentDataEnable, sendRenameSegmentCommand, sendSpeakerTestCommand, sendSpeakerVolume, sendSplitSegmentCommand, sendStartMappingPass, sendTimerCreation, sendTimerUpdate, sendUpdaterCommand, sendValetudoEventInteraction, sendValetudoLogLevel, sendVoicePackManagementCommand, sendWifiConfiguration, subscribeToLogMessages, subscribeToMap, subscribeToStateAttributes, updatePresetSelection, fetchValetudoInformation, fetchQuirks, sendSetQuirkValueCommand, fetchRobotProperties, fetchMQTTStatus, fetchNetworkAdvertisementConfiguration, fetchNetworkAdvertisementProperties, sendNetworkAdvertisementConfiguration, sendMopDockDryManualTriggerCommand, sendMopDockCleanManualTriggerCommand, fetchWifiConfigurationProperties, fetchWifiScan, sendDismissWelcomeDialogAction, sendRestoreDefaultConfigurationAction, fetchUpdaterConfiguration, sendUpdaterConfiguration, fetchValetudoCustomizations, sendValetudoCustomizations, fetchConsumableProperties } from "./client";
import { RobotAttributeClass } from "./RawRobotState";
import { isAttribute } from "./utils";
import { Capability } from "./types";
var CacheKey;
(function (CacheKey) {
  CacheKey["Capabilities"] = "capabilities";
  CacheKey["Map"] = "map";
  CacheKey["Consumables"] = "consumables";
  CacheKey["ConsumableProperties"] = "consumable_properties";
  CacheKey["Attributes"] = "attributes";
  CacheKey["PresetSelections"] = "preset_selections";
  CacheKey["ZoneProperties"] = "zone_properties";
  CacheKey["Segments"] = "segments";
  CacheKey["MapSegmentationProperties"] = "map_segmentation_properties";
  CacheKey["PersistentData"] = "persistent_data";
  CacheKey["RobotInformation"] = "robot_information";
  CacheKey["ValetudoInformation"] = "valetudo_information";
  CacheKey["ValetudoVersion"] = "valetudo_version";
  CacheKey["CarpetMode"] = "carpet_mode";
  CacheKey["SpeakerVolume"] = "speaker_volume";
  CacheKey["VoicePackManagement"] = "voice_pack";
  CacheKey["SystemHostInfo"] = "system_host_info";
  CacheKey["SystemRuntimeInfo"] = "system_runtime_info";
  CacheKey["MQTTConfiguration"] = "mqtt_configuration";
  CacheKey["MQTTStatus"] = "mqtt_status";
  CacheKey["MQTTProperties"] = "mqtt_properties";
  CacheKey["HTTPBasicAuth"] = "http_basic_auth";
  CacheKey["NetworkAdvertisementConfiguration"] = "network_advertisement_configuration";
  CacheKey["NetworkAdvertisementProperties"] = "network_advertisement_properties";
  CacheKey["NTPClientState"] = "ntp_client_state";
  CacheKey["NTPClientConfiguration"] = "ntp_client_configuration";
  CacheKey["Timers"] = "timers";
  CacheKey["TimerProperties"] = "timer_properties";
  CacheKey["ValetudoEvents"] = "valetudo_events";
  CacheKey["Log"] = "log";
  CacheKey["LogLevel"] = "log_level";
  CacheKey["KeyLockInformation"] = "key_lock";
  CacheKey["AutoEmptyDockAutoEmpty"] = "auto_empty_dock_auto_empty";
  CacheKey["DoNotDisturb"] = "do_not_disturb";
  CacheKey["WifiStatus"] = "wifi_status";
  CacheKey["WifiConfigurationProperties"] = "wifi_configuration_properties";
  CacheKey["WifiScan"] = "wifi_scan";
  CacheKey["ManualControl"] = "manual_control";
  CacheKey["ManualControlProperties"] = "manual_control_properties";
  CacheKey["CombinedVirtualRestrictionsProperties"] = "combined_virtual_restrictions_properties";
  CacheKey["UpdaterConfiguration"] = "updater_configuration";
  CacheKey["UpdaterState"] = "updater_state";
  CacheKey["CurrentStatistics"] = "current_statistics";
  CacheKey["CurrentStatisticsProperties"] = "current_statistics_properties";
  CacheKey["TotalStatistics"] = "total_statistics";
  CacheKey["TotalStatisticsProperties"] = "total_statistics_properties";
  CacheKey["Quirks"] = "quirks";
  CacheKey["RobotProperties"] = "robot_properties";
  CacheKey["ValetudoCustomizations"] = "valetudo_customizations";
})(CacheKey || (CacheKey = {}));

const useOnCommandError = capability => {
  const {
    enqueueSnackbar
  } = useSnackbar();
  return React.useCallback(error => {
    let errorMessage = "";
    if (typeof error?.toString === "function") {
      errorMessage = error.toString();
    }
    if (typeof error?.response?.data === "string") {
      errorMessage = error.response.data;
    }
    enqueueSnackbar(`An error occurred while sending command to ${capability}:\n${errorMessage}`, {
      preventDuplicate: true,
      key: capability,
      variant: "error"
    });
  }, [capability, enqueueSnackbar]);
};
const useOnSettingsChangeError = setting => {
  const {
    enqueueSnackbar
  } = useSnackbar();
  return React.useCallback(error => {
    enqueueSnackbar(`An error occurred while updating ${setting} settings: ${error}`, {
      preventDuplicate: true,
      key: setting,
      variant: "error"
    });
  }, [setting, enqueueSnackbar]);
};
const useSSECacheUpdater = (key, subscriber) => {
  const queryClient = useQueryClient();
  React.useEffect(() => {
    return subscriber(data => {
      return queryClient.setQueryData(key, data);
    });
  }, [key, queryClient, subscriber]);
};
const useSSECacheAppender = (key, subscriber) => {
  const queryClient = useQueryClient();
  React.useEffect(() => {
    return subscriber(data => {
      let currentLog = queryClient.getQueryData(key);
      let newData;
      if (typeof currentLog === "string" || currentLog instanceof String) {
        currentLog = currentLog.trim();
        newData = `${currentLog}\n${data}`;
      } else {
        newData = `${data}`;
      }
      return queryClient.setQueryData(key, newData);
    });
  }, [key, queryClient, subscriber]);
};
export const useCapabilitiesQuery = () => {
  return useQuery(CacheKey.Capabilities, fetchCapabilities, {
    staleTime: Infinity
  });
};
export const useRobotMapQuery = () => {
  useSSECacheUpdater(CacheKey.Map, subscribeToMap);
  return useQuery(CacheKey.Map, fetchMap, {
    staleTime: 500
  });
};
export function useRobotAttributeQuery(clazz, select) {
  useSSECacheUpdater(CacheKey.Attributes, subscribeToStateAttributes);
  return useQuery(CacheKey.Attributes, fetchStateAttributes, {
    staleTime: 1000,
    select: attributes => {
      const filteredAttributes = attributes.filter(isAttribute(clazz));
      return select ? select(filteredAttributes) : filteredAttributes;
    }
  });
}
export function useRobotStatusQuery(select) {
  useSSECacheUpdater(CacheKey.Attributes, subscribeToStateAttributes);
  return useQuery(CacheKey.Attributes, fetchStateAttributes, {
    staleTime: 1000,
    select: attributes => {
      const status = attributes.filter(isAttribute(RobotAttributeClass.StatusState))[0] ?? {
        __class: RobotAttributeClass.StatusState,
        metaData: {},
        value: "error",
        flag: "none"
      };
      return select ? select(status) : status;
    }
  });
}
export const usePresetSelectionsQuery = capability => {
  return useQuery([CacheKey.PresetSelections, capability], () => {
    return fetchPresetSelections(capability);
  }, {
    staleTime: Infinity
  });
};
export const capabilityToPresetType = {
  [Capability.FanSpeedControl]: "fan_speed",
  [Capability.WaterUsageControl]: "water_grade",
  [Capability.OperationModeControl]: "operation_mode"
};
export const usePresetSelectionMutation = capability => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(capability);
  return useMutation(level => {
    return updatePresetSelection(capability, level).then(fetchStateAttributes);
  }, {
    onSuccess(data) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
    },
    onError
  });
};
export const useBasicControlMutation = () => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.BasicControl);
  return useMutation(command => {
    return sendBasicControlCommand(command).then(fetchStateAttributes);
  }, {
    onError,
    onSuccess(data) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
    }
  });
};
export const useGoToMutation = options => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.GoToLocation);
  return useMutation(coordinates => {
    return sendGoToCommand(coordinates).then(fetchStateAttributes);
  }, {
    onError,
    ...options,
    async onSuccess(data, ...args) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
      await options?.onSuccess?.(data, ...args);
    }
  });
};
export const useZonePropertiesQuery = () => {
  return useQuery(CacheKey.ZoneProperties, fetchZoneProperties, {
    staleTime: Infinity
  });
};
export const useCleanTemporaryZonesMutation = options => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.ZoneCleaning);
  return useMutation(zones => {
    return sendCleanTemporaryZonesCommand(zones).then(fetchStateAttributes);
  }, {
    onError,
    ...options,
    async onSuccess(data, ...args) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
      await options?.onSuccess?.(data, ...args);
    }
  });
};
export const useSegmentsQuery = () => {
  return useQuery(CacheKey.Segments, fetchSegments);
};
// As conditional hooks aren't allowed, this query needs a way to be disabled but referenced
// for cases where a component might need the properties but only if the capability exists
export const useMapSegmentationPropertiesQuery = enabled => {
  return useQuery(CacheKey.MapSegmentationProperties, fetchMapSegmentationProperties, {
    staleTime: Infinity,
    enabled: enabled ?? true
  });
};
export const useCleanSegmentsMutation = options => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.MapSegmentation);
  return useMutation(parameters => {
    return sendCleanSegmentsCommand(parameters).then(fetchStateAttributes);
  }, {
    onError,
    ...options,
    async onSuccess(data, ...args) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
      await options?.onSuccess?.(data, ...args);
    }
  });
};
export const useJoinSegmentsMutation = options => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.MapSegmentEdit);
  return useMutation(parameters => {
    return sendJoinSegmentsCommand(parameters).then(fetchStateAttributes); //TODO: this should actually refetch the map
  }, {
    onError,
    ...options,
    async onSuccess(data, ...args) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
      await options?.onSuccess?.(data, ...args);
    }
  });
};
export const useSplitSegmentMutation = options => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.MapSegmentEdit);
  return useMutation(parameters => {
    return sendSplitSegmentCommand(parameters).then(fetchStateAttributes); //TODO: this should actually refetch the map
  }, {
    onError,
    ...options,
    async onSuccess(data, ...args) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
      await options?.onSuccess?.(data, ...args);
    }
  });
};
export const useRenameSegmentMutation = options => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.MapSegmentRename);
  return useMutation(parameters => {
    return sendRenameSegmentCommand(parameters).then(fetchStateAttributes); //TODO: this should actually refetch the map
  }, {
    onError,
    ...options,
    async onSuccess(data, ...args) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
      await options?.onSuccess?.(data, ...args);
    }
  });
};
export const useLocateMutation = () => {
  const onError = useOnCommandError(Capability.Locate);
  return useMutation(sendLocateCommand, {
    onError
  });
};
export const useConsumableStateQuery = () => {
  return useQuery(CacheKey.Consumables, fetchConsumableStateInformation, {
    staleTime: 300000,
    refetchInterval: 300000
  });
};
const useValetudoFetchingMutation = (onError, cacheKey, mutationFn) => {
  const queryClient = useQueryClient();
  return useMutation(mutationFn, {
    onSuccess(data) {
      queryClient.setQueryData(cacheKey, data, {
        updatedAt: Date.now()
      });
    },
    onError
  });
};
export const useConsumablePropertiesQuery = () => {
  return useQuery(CacheKey.ConsumableProperties, fetchConsumableProperties, {
    staleTime: Infinity
  });
};
export const useConsumableResetMutation = () => {
  return useValetudoFetchingMutation(useOnCommandError(Capability.ConsumableMonitoring), CacheKey.Consumables, parameters => {
    return sendConsumableReset(parameters).then(fetchConsumableStateInformation);
  });
};
export const useAutoEmptyDockManualTriggerMutation = () => {
  const onError = useOnCommandError(Capability.AutoEmptyDockManualTrigger);
  return useMutation(sendAutoEmptyDockManualTriggerCommand, {
    onError
  });
};
export const useRobotInformationQuery = () => {
  return useQuery(CacheKey.RobotInformation, fetchRobotInformation, {
    staleTime: Infinity
  });
};
export const useValetudoInformationQuery = () => {
  return useQuery(CacheKey.ValetudoInformation, fetchValetudoInformation, {
    staleTime: Infinity
  });
};
export const useDismissWelcomeDialogMutation = () => {
  const queryClient = useQueryClient();
  const onError = useOnSettingsChangeError("Welcome Dialog");
  return useMutation(() => {
    return sendDismissWelcomeDialogAction().then(fetchValetudoInformation).then(state => {
      queryClient.setQueryData(CacheKey.ValetudoInformation, state, {
        updatedAt: Date.now()
      });
    });
  }, {
    onError
  });
};
export const useRestoreDefaultConfigurationMutation = () => {
  const queryClient = useQueryClient();
  const onError = useOnSettingsChangeError("Config Restore");
  return useMutation(() => {
    return sendRestoreDefaultConfigurationAction().then(() => {
      queryClient.refetchQueries().catch(() => {
        /*intentional*/
      });
    });
  }, {
    onError
  });
};
export const useValetudoVersionQuery = () => {
  return useQuery(CacheKey.ValetudoVersion, fetchValetudoVersionInformation, {
    staleTime: Infinity
  });
};
export const useSystemHostInfoQuery = () => {
  return useQuery(CacheKey.SystemHostInfo, fetchSystemHostInfo);
};
export const useSystemRuntimeInfoQuery = () => {
  return useQuery(CacheKey.SystemRuntimeInfo, fetchSystemRuntimeInfo);
};
export const useMQTTConfigurationQuery = () => {
  return useQuery(CacheKey.MQTTConfiguration, fetchMQTTConfiguration, {
    staleTime: Infinity
  });
};
export const useMQTTConfigurationMutation = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("MQTT"), CacheKey.MQTTConfiguration, mqttConfiguration => {
    return sendMQTTConfiguration(mqttConfiguration).then(fetchMQTTConfiguration);
  });
};
export const useMQTTStatusQuery = () => {
  return useQuery(CacheKey.MQTTStatus, fetchMQTTStatus, {
    staleTime: 5000,
    refetchInterval: 5000
  });
};
export const useMQTTPropertiesQuery = () => {
  return useQuery(CacheKey.MQTTProperties, fetchMQTTProperties, {
    staleTime: Infinity
  });
};
export const useHTTPBasicAuthConfigurationQuery = () => {
  return useQuery(CacheKey.HTTPBasicAuth, fetchHTTPBasicAuthConfiguration, {
    staleTime: Infinity
  });
};
export const useHTTPBasicAuthConfigurationMutation = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("HTTP Basic Auth"), CacheKey.HTTPBasicAuth, configuration => {
    return sendHTTPBasicAuthConfiguration(configuration).then(fetchHTTPBasicAuthConfiguration);
  });
};
export const useNetworkAdvertisementConfigurationQuery = () => {
  return useQuery(CacheKey.NetworkAdvertisementConfiguration, fetchNetworkAdvertisementConfiguration, {
    staleTime: Infinity
  });
};
export const useNetworkAdvertisementConfigurationMutation = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("Network Advertisement"), CacheKey.NetworkAdvertisementConfiguration, networkAdvertisementConfiguration => {
    return sendNetworkAdvertisementConfiguration(networkAdvertisementConfiguration).then(fetchNetworkAdvertisementConfiguration);
  });
};
export const useNetworkAdvertisementPropertiesQuery = () => {
  return useQuery(CacheKey.NetworkAdvertisementProperties, fetchNetworkAdvertisementProperties, {
    staleTime: Infinity
  });
};
export const useNTPClientStateQuery = () => {
  return useQuery(CacheKey.NTPClientState, fetchNTPClientState, {
    staleTime: 5000,
    refetchInterval: 5000
  });
};
export const useNTPClientConfigurationQuery = () => {
  return useQuery(CacheKey.NTPClientConfiguration, fetchNTPClientConfiguration, {
    staleTime: Infinity
  });
};
export const useNTPClientConfigurationMutation = () => {
  const queryClient = useQueryClient();
  const onError = useOnSettingsChangeError("NTP Client");
  return useMutation(configuration => {
    return sendNTPClientConfiguration(configuration).then(fetchNTPClientConfiguration).then(configuration => {
      queryClient.setQueryData(CacheKey.NTPClientConfiguration, configuration, {
        updatedAt: Date.now()
      });
    }).then(fetchNTPClientState).then(state => {
      queryClient.setQueryData(CacheKey.NTPClientState, state, {
        updatedAt: Date.now()
      });
    });
  }, {
    onError
  });
};
export const useTimerInfoQuery = () => {
  return useQuery(CacheKey.Timers, fetchTimerInformation);
};
export const useTimerPropertiesQuery = () => {
  return useQuery(CacheKey.TimerProperties, fetchTimerProperties, {
    staleTime: Infinity
  });
};
export const useTimerCreationMutation = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("Timer"), CacheKey.Timers, timer => {
    return sendTimerCreation(timer).then(fetchTimerInformation);
  });
};
export const useTimerModificationMutation = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("Timer"), CacheKey.Timers, timer => {
    return sendTimerUpdate(timer).then(fetchTimerInformation);
  });
};
export const useTimerDeletionMutation = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("Timer"), CacheKey.Timers, timerId => {
    return deleteTimer(timerId).then(fetchTimerInformation);
  });
};
export const useValetudoEventsQuery = () => {
  return useQuery(CacheKey.ValetudoEvents, fetchValetudoEvents, {
    staleTime: 30000,
    refetchInterval: 30000
  });
};
export const useValetudoEventsInteraction = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("Valetudo Events"), CacheKey.ValetudoEvents, interaction => {
    return sendValetudoEventInteraction(interaction).then(fetchValetudoEvents);
  });
};
export function useValetudoLogQuery() {
  useSSECacheAppender(CacheKey.Log, subscribeToLogMessages);
  return useQuery(CacheKey.Log, fetchValetudoLog, {
    staleTime: Infinity
  });
}
export const useLogLevelQuery = () => {
  return useQuery(CacheKey.LogLevel, fetchValetudoLogLevel, {
    staleTime: Infinity
  });
};
export const useLogLevelMutation = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("Log level"), CacheKey.LogLevel, logLevel => {
    return sendValetudoLogLevel(logLevel).then(fetchValetudoLogLevel);
  });
};
export const usePersistentDataQuery = () => {
  return useQuery(CacheKey.PersistentData, fetchPersistentDataState, {
    staleTime: Infinity
  });
};
export const usePersistentDataMutation = () => {
  return useValetudoFetchingMutation(useOnCommandError(Capability.PersistentMapControl), CacheKey.PersistentData, enable => {
    return sendPersistentDataEnable(enable).then(fetchPersistentDataState);
  });
};



export const useMapResetMutation = () => {
  const onError = useOnCommandError(Capability.MapReset);
  return useMutation(sendMapReset, {
    onError
  });
};


// export const usePersistentMapQuery = () => {
//   return useQuery( {
//       queryKey: [QueryKey.PersistentMap],
//       queryFn: fetchPersistentMapState,
//       staleTime: Infinity
//   });
// };

// export const usePersistentMapMutation = () => {
//   return useValetudoFetchingMutation({
//       queryKey: [QueryKey.PersistentMap],
//       mutationFn: (enabled: boolean) => {
//           return sendPersistentMapEnabled(enabled).then(fetchPersistentMapState);
//       },
//       onError: useOnCommandError(Capability.PersistentMapControl)
//   });
// };

export const useStartMappingPassMutation = () => {
  const onError = useOnCommandError(Capability.MappingPass);
  return useMutation(sendStartMappingPass, {
    onError
  });
};
export const useSpeakerVolumeStateQuery = () => {
  return useQuery(CacheKey.SpeakerVolume, fetchSpeakerVolumeState, {
    staleTime: Infinity
  });
};
export const useSpeakerVolumeMutation = () => {
  return useValetudoFetchingMutation(useOnCommandError(Capability.SpeakerVolumeControl), CacheKey.SpeakerVolume, volume => {
    return sendSpeakerVolume(volume).then(fetchSpeakerVolumeState);
  });
};
export const useSpeakerTestTriggerTriggerMutation = () => {
  const onError = useOnCommandError(Capability.SpeakerTest);
  return useMutation(sendSpeakerTestCommand, {
    onError
  });
};
export const useVoicePackManagementStateQuery = () => {
  return useQuery(CacheKey.VoicePackManagement, fetchVoicePackManagementState, {
    staleTime: 500
  });
};
export const useVoicePackManagementMutation = () => {
  return useValetudoFetchingMutation(useOnCommandError(Capability.VoicePackManagement), CacheKey.VoicePackManagement, command => {
    return sendVoicePackManagementCommand(command).then(fetchVoicePackManagementState);
  });
};
export const useKeyLockStateQuery = () => {
  return useQuery(CacheKey.KeyLockInformation, fetchKeyLockState, {
    staleTime: Infinity
  });
};
export const useKeyLockStateMutation = () => {
  return useValetudoFetchingMutation(useOnCommandError(Capability.KeyLock), CacheKey.KeyLockInformation, enable => {
    return sendKeyLockEnable(enable).then(fetchKeyLockState);
  });
};
export const useCarpetModeStateQuery = () => {
  return useQuery(CacheKey.CarpetMode, fetchCarpetModeState, {
    staleTime: Infinity
  });
};
export const useCarpetModeStateMutation = () => {
  return useValetudoFetchingMutation(useOnCommandError(Capability.CarpetModeControl), CacheKey.CarpetMode, enable => {
    return sendCarpetModeEnable(enable).then(fetchCarpetModeState);
  });
};
export const useAutoEmptyDockAutoEmptyControlQuery = () => {
  return useQuery(CacheKey.AutoEmptyDockAutoEmpty, fetchAutoEmptyDockAutoEmptyControlState, {
    staleTime: Infinity
  });
};
export const useAutoEmptyDockAutoEmptyControlMutation = () => {
  return useValetudoFetchingMutation(useOnCommandError(Capability.AutoEmptyDockAutoEmptyControl), CacheKey.AutoEmptyDockAutoEmpty, enable => {
    return sendAutoEmptyDockAutoEmptyControlEnable(enable).then(fetchAutoEmptyDockAutoEmptyControlState);
  });
};
export const useDoNotDisturbConfigurationQuery = () => {
  return useQuery(CacheKey.DoNotDisturb, fetchDoNotDisturbConfiguration, {
    staleTime: Infinity
  });
};
export const useDoNotDisturbConfigurationMutation = () => {
  return useValetudoFetchingMutation(useOnCommandError(Capability.DoNotDisturb), CacheKey.DoNotDisturb, configuration => {
    return sendDoNotDisturbConfiguration(configuration).then(fetchDoNotDisturbConfiguration);
  });
};
export const useWifiStatusQuery = () => {
  return useQuery(CacheKey.WifiStatus, fetchWifiStatus, {
    staleTime: Infinity
  });
};
export const useWifiConfigurationPropertiesQuery = () => {
  return useQuery(CacheKey.WifiConfigurationProperties, fetchWifiConfigurationProperties, {
    staleTime: Infinity
  });
};
export const useWifiConfigurationMutation = options => {
  const {
    refetch: refetchWifiStatus
  } = useWifiStatusQuery();
  return useMutation(sendWifiConfiguration, {
    onError: useOnCommandError(Capability.WifiConfiguration),
    async onSuccess(data, ...args) {
      refetchWifiStatus().catch(() => {
        /*intentional*/
      });
      await options?.onSuccess?.(data, ...args);
    }
  });
};
export const useWifiScanQuery = () => {
  return useQuery(CacheKey.WifiScan, fetchWifiScan, {
    staleTime: Infinity
  });
};
export const useManualControlStateQuery = () => {
  return useQuery(CacheKey.ManualControl, fetchManualControlState, {
    staleTime: 10000,
    refetchInterval: 10000
  });
};
export const useManualControlPropertiesQuery = () => {
  return useQuery(CacheKey.ManualControlProperties, fetchManualControlProperties, {
    staleTime: Infinity
  });
};
export const useManualControlInteraction = () => {
  return useValetudoFetchingMutation(useOnCommandError(Capability.ManualControl), CacheKey.ManualControl, interaction => {
    return sendManualControlInteraction(interaction).then(fetchManualControlState);
  });
};
export const useCombinedVirtualRestrictionsPropertiesQuery = () => {
  return useQuery(CacheKey.CombinedVirtualRestrictionsProperties, fetchCombinedVirtualRestrictionsPropertiesProperties, {
    staleTime: Infinity
  });
};
export const useCombinedVirtualRestrictionsMutation = options => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.CombinedVirtualRestrictions);
  return useMutation(parameters => {
    return sendCombinedVirtualRestrictionsUpdate(parameters).then(fetchStateAttributes); //TODO: this should actually refetch the map
  }, {
    onError,
    ...options,
    async onSuccess(data, ...args) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
      await options?.onSuccess?.(data, ...args);
    }
  });
};
export const useUpdaterConfigurationQuery = () => {
  return useQuery(CacheKey.UpdaterConfiguration, fetchUpdaterConfiguration, {
    staleTime: Infinity
  });
};
export const useUpdaterConfigurationMutation = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("Updater"), CacheKey.UpdaterConfiguration, updaterConfiguration => {
    return sendUpdaterConfiguration(updaterConfiguration).then(fetchUpdaterConfiguration);
  });
};
export const useUpdaterStateQuery = () => {
  return useQuery(CacheKey.UpdaterState, fetchUpdaterState, {
    staleTime: 5000,
    refetchInterval: 5000
  });
};
export const useUpdaterCommandMutation = () => {
  const {
    refetch: refetchUpdaterState
  } = useUpdaterStateQuery();
  return useMutation(sendUpdaterCommand, {
    onError: useOnCommandError("Updater"),
    onSuccess() {
      refetchUpdaterState().catch(() => {});
    }
  });
};
export const useCurrentStatisticsQuery = () => {
  return useQuery(CacheKey.CurrentStatistics, fetchCurrentStatistics, {
    staleTime: 60000,
    refetchInterval: 60000
  });
};
export const useCurrentStatisticsPropertiesQuery = () => {
  return useQuery(CacheKey.CurrentStatisticsProperties, fetchCurrentStatisticsProperties, {
    staleTime: Infinity
  });
};
export const useTotalStatisticsQuery = () => {
  return useQuery(CacheKey.TotalStatistics, fetchTotalStatistics, {
    staleTime: 60000,
    refetchInterval: 60000
  });
};
export const useTotalStatisticsPropertiesQuery = () => {
  return useQuery(CacheKey.TotalStatisticsProperties, fetchTotalStatisticsProperties, {
    staleTime: Infinity
  });
};
export const useQuirksQuery = () => {
  return useQuery(CacheKey.Quirks, fetchQuirks);
};
export const useSetQuirkValueMutation = () => {
  const {
    refetch: refetchQuirksState
  } = useQuirksQuery();
  return useMutation(sendSetQuirkValueCommand, {
    onError: useOnCommandError(Capability.Quirks),
    onSuccess() {
      refetchQuirksState().catch(() => {});
    }
  });
};
export const useRobotPropertiesQuery = () => {
  return useQuery(CacheKey.RobotProperties, fetchRobotProperties, {
    staleTime: Infinity
  });
};
export const useMopDockCleanManualTriggerMutation = () => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.MopDockCleanManualTrigger);
  return useMutation(command => {
    return sendMopDockCleanManualTriggerCommand(command).then(fetchStateAttributes);
  }, {
    onError,
    onSuccess(data) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
    }
  });
};
export const useMopDockDryManualTriggerMutation = () => {
  const queryClient = useQueryClient();
  const onError = useOnCommandError(Capability.MopDockDryManualTrigger);
  return useMutation(command => {
    return sendMopDockDryManualTriggerCommand(command).then(fetchStateAttributes);
  }, {
    onError,
    onSuccess(data) {
      queryClient.setQueryData(CacheKey.Attributes, data, {
        updatedAt: Date.now()
      });
    }
  });
};
export const useValetudoCustomizationsQuery = () => {
  return useQuery(CacheKey.ValetudoCustomizations, fetchValetudoCustomizations, {
    staleTime: Infinity
  });
};
export const useValetudoCustomizationsMutation = () => {
  return useValetudoFetchingMutation(useOnSettingsChangeError("Valetudo Customizations"), CacheKey.ValetudoCustomizations, configuration => {
    return sendValetudoCustomizations(configuration).then(fetchValetudoCustomizations);
  });
};